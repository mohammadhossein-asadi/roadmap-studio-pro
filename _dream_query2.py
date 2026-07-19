import sqlite3, json, sys

db_path = r"C:\Users\MohammadHossein\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

action = sys.argv[1] if len(sys.argv) > 1 else "schema"

if action == "schema":
    c.execute("PRAGMA table_info(message)")
    print("message columns:", [r[1] for r in c.fetchall()])
    c.execute("PRAGMA table_info(part)")
    print("part columns:", [r[1] for r in c.fetchall()])
    c.execute("PRAGMA table_info(session)")
    print("session columns:", [r[1] for r in c.fetchall()])
    # Sample user message
    c.execute("SELECT data FROM message WHERE data LIKE '%\"role\":\"user\"%' LIMIT 1")
    row = c.fetchone()
    if row:
        print("Sample user data:", row[0][:800])

elif action == "user_msgs":
    session_id = sys.argv[2]
    c.execute("SELECT id, data FROM message WHERE session_id = ? ORDER BY time_created", (session_id,))
    for row in c.fetchall():
        d = json.loads(row[1])
        role = d.get("role", "?")
        if role == "user":
            content = d.get("content", "")
            if isinstance(content, list):
                content = " ".join([p.get("text", "") for p in content if isinstance(p, dict)])
            print(json.dumps({"msg_id": row[0], "role": role, "content": str(content)[:800]}))

elif action == "search_content":
    keyword = sys.argv[2]
    limit = int(sys.argv[3]) if len(sys.argv) > 3 else 20
    c.execute("SELECT session_id, data FROM message ORDER BY time_created DESC")
    results = []
    for row in c.fetchall():
        d = json.loads(row[1])
        content = d.get("content", "")
        if isinstance(content, list):
            content = " ".join([p.get("text", "") for p in content if isinstance(p, dict)])
        content = str(content)
        if keyword.lower() in content.lower():
            results.append({"session_id": row[0], "role": d.get("role", "?"), "content": content[:600]})
            if len(results) >= limit:
                break
    for r in results:
        print(json.dumps(r))

elif action == "tool_errors":
    session_id = sys.argv[2]
    c.execute("""
        SELECT p.data
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND m.agent_id = ''
        ORDER BY m.time_created, p.time_created
    """, (session_id,))
    for row in c.fetchall():
        d = json.loads(row[0])
        if d.get("type") == "tool":
            state = d.get("state", {})
            output = str(state.get("output", ""))
            if "error" in output.lower() or "Error" in output:
                tool = d.get("tool", "?")
                print(json.dumps({"tool": tool, "error_preview": output[:500]}))

conn.close()

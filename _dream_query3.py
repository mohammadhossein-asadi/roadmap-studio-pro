import sqlite3, json, sys

db_path = r"C:\Users\MohammadHossein\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

action = sys.argv[1]

if action == "raw_user":
    session_id = sys.argv[2]
    c.execute("SELECT id, data FROM message WHERE session_id = ? ORDER BY time_created", (session_id,))
    for row in c.fetchall():
        d = json.loads(row[1])
        if d.get("role") == "user":
            # Print full data to understand structure
            print(json.dumps(d, indent=2, default=str)[:2000])
            print("---MSG_END---")

elif action == "search_text":
    keyword = sys.argv[2]
    limit = int(sys.argv[3]) if len(sys.argv) > 3 else 20
    # Search in both message data and part data
    c.execute("SELECT session_id, data FROM message ORDER BY time_created DESC")
    found = 0
    for row in c.fetchall():
        d = json.loads(row[1])
        role = d.get("role", "?")
        # Check full json dump for keyword
        full = json.dumps(d, default=str)
        if keyword.lower() in full.lower():
            content = d.get("content", "")
            if isinstance(content, list):
                content = " ".join([str(p) for p in content])
            content = str(content)[:600]
            print(json.dumps({"session_id": row[0], "role": role, "content": content}))
            found += 1
            if found >= limit:
                break

    # Also search part data
    c.execute("SELECT session_id, data FROM part ORDER BY time_created DESC")
    for row in c.fetchall():
        full = json.dumps(json.loads(row[1]), default=str)
        if keyword.lower() in full.lower():
            d = json.loads(row[1])
            ptype = d.get("type", "?")
            if ptype == "text":
                text = d.get("text", "")[:600]
                print(json.dumps({"session_id": row[0], "part_type": ptype, "text": text}))
                found += 1
                if found >= limit:
                    break

elif action == "error_search":
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else 20
    c.execute("SELECT session_id, data FROM part ORDER BY time_created DESC")
    found = 0
    for row in c.fetchall():
        d = json.loads(row[1])
        if d.get("type") == "tool":
            state = d.get("state", {})
            output = str(state.get("output", ""))
            if "error" in output.lower():
                tool = d.get("tool", "?")
                print(json.dumps({"session_id": row[0], "tool": tool, "error": output[:400]}))
                found += 1
                if found >= limit:
                    break

conn.close()

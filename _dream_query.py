import sqlite3, json, sys

db_path = r"C:\Users\MohammadHossein\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

action = sys.argv[1] if len(sys.argv) > 1 else "sessions"

if action == "sessions":
    c.execute("""
        SELECT id, directory, title, time_created 
        FROM session 
        WHERE directory LIKE '%roadmap-studio-pro%' 
        ORDER BY time_created DESC 
        LIMIT 20
    """)
    for row in c.fetchall():
        print(json.dumps({
            "id": row[0], 
            "directory": row[1], 
            "title": row[2], 
            "time_created": str(row[3])
        }))

elif action == "trajectory":
    session_id = sys.argv[2]
    c.execute("""
        SELECT m.id, m.agent_id,
               json_extract(p.data, '$.type') as part_type,
               json_extract(p.data, '$.tool') as tool,
               substr(p.data, 1, 1200) as preview
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND json_extract(m.data, '$.role') = 'assistant'
        ORDER BY m.time_created, p.time_created
    """, (session_id,))
    for row in c.fetchall():
        print(json.dumps({
            "message_id": row[0],
            "agent_id": row[1],
            "part_type": row[2],
            "tool": row[3],
            "preview": row[4]
        }))

elif action == "user_search":
    keyword = sys.argv[2]
    c.execute("""
        SELECT m.session_id, substr(json_extract(m.data, '$.content'), 1, 500) as content
        FROM message m
        WHERE json_extract(m.data, '$.role') = 'user'
          AND json_extract(m.data, '$.content') LIKE ?
        ORDER BY m.time_created DESC
        LIMIT 30
    """, (f"%{keyword}%",))
    for row in c.fetchall():
        print(json.dumps({
            "session_id": row[0],
            "content": row[1]
        }))

elif action == "all_user_search":
    keywords = sys.argv[2].split(",")
    for kw in keywords:
        c.execute("""
            SELECT m.session_id, substr(json_extract(m.data, '$.content'), 1, 500) as content
            FROM message m
            WHERE json_extract(m.data, '$.role') = 'user'
              AND json_extract(m.data, '$.content') LIKE ?
            ORDER BY m.time_created DESC
            LIMIT 10
        """, (f"%{kw.strip()}%",))
        results = c.fetchall()
        if results:
            print(f"\n=== Search: {kw.strip()} ===")
            for row in results:
                print(json.dumps({
                    "session_id": row[0],
                    "content": row[1]
                }))

elif action == "error_search":
    c.execute("""
        SELECT m.session_id, substr(json_extract(p.data, '$.state.output'), 1, 800) as output
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE json_extract(p.data, '$.type') = 'tool'
          AND json_extract(p.data, '$.state.output') LIKE '%error%'
        ORDER BY m.time_created DESC
        LIMIT 20
    """)
    for row in c.fetchall():
        print(json.dumps({
            "session_id": row[0],
            "error_output": row[1]
        }))

conn.close()

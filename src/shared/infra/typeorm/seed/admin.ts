import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash("Sl1322**", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at)
      values('${id}', 'admin', 'admin@stocks.com', '${password}', true, 'now()')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));

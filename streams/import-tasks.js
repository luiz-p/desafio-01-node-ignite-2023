import { parse } from 'csv-parse';
import fs from 'fs';

const databasePath = new URL('tasks.csv', import.meta.url)

async function importTask() {
  const parsed = fs.createReadStream(databasePath).pipe(
    parse({
      columns: true,
      delimiter: ','
    })
  )

  for await (const row of parsed) {
    const { title, description } = row

    fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description
      }),
      duplex: 'half'
    })
  }
}

importTask()

import Property from '../../core/property';
const Table = require('cli-table');

export default function renderTable(properties: Property[]) {
  const table = new Table({
    head: ['URL', 'Title', 'Location', 'Price', 'Added'],
    colWidths: [106, 50, 30, 10, 18]
  });

  for (const property of properties) {
    table.push([
      property.offerUrl,
      property.title,
      property.location,
      property.price,
      property.added
    ]);
  }

  console.log(table.toString());
}
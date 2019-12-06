const express = require("express");
var bodyParser = require("body-parser");
const signale = require("signale");
const uuidv1 = require("uuid/v1");
const faker = require("faker");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/api/users", (req, res) => {
  let { page, per_page } = req.query;

  if (!page || !per_page) {
    signale.error(`GET | page: [${page}] | per_page: [${per_page}]`);
    page = 1;
    per_page = 10;
  }

  signale.success(`GET | page: [${page}] | per_page: [${per_page}]`);

  const TOTAL_COUNT = 100;
  const TOTAL_PAGE = Math.ceil(TOTAL_COUNT / per_page);

  let data = {
    meta: {
      page: page,
      totalPage: TOTAL_PAGE,
      totalCount: TOTAL_COUNT,
      perPage: per_page
    },
    items: []
  };

  if (page <= 0 || page > TOTAL_PAGE) {
    return res.json(data);
  }

  for (let index = 0; index < per_page; index++) {
    const item = {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      firstName: faker.name.firstName,
      lastName: faker.name.lastName,
      email: faker.internet.email(),
      isActive: faker.random.boolean()
    };

    data.items.push(item);
  }

  return res.json(data);
});

const PORT = 1234;
app.listen(PORT, () =>
  console.log(`Api listening on port http://localhost:${PORT}/api/users`)
);

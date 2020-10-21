"use strict";

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {getRandomInt, shuffle} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const getCurrentDateTime = () => {
  const date = new Date().toJSON().slice(0, 10);
  const time = new Date().toJSON().slice(11, 19);
  return `${date} ${time}`;
};

const generateOffers = (count, options) => {
  const {titles, categories, sentences} = options;

  return Array(count)
    .fill({})
    .map(() => ({
      category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
      description: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences)
        .slice(1, sentences.length - 1)
        .join(` `),
      title: titles[getRandomInt(1, titles.length - 1)],
      createdDate: getCurrentDateTime()
    }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(path.resolve(__dirname, filePath), `utf8`);

    return content.split(`\n`).filter((contentString) => {
      contentString.trim();
      return contentString.length > 0;
    });
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};


module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const options = {
      titles,
      categories,
      sentences,
    };


    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, options));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation is successful. File is created.`));
    } catch (e) {
      console.log(chalk.red(`Can't write data to file...`));
    }
  },
};

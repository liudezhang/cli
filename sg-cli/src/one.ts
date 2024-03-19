import inquirer, { Answers, QuestionCollection } from "inquirer";

const questions = [
  {
    name: "template",
    type: "expand",
    message: "请选择模板",
    choices: [
      {
        name: "react",
        value: "react",
      },
    ],
  },
] as QuestionCollection<Answers>[];

inquirer
  .prompt([
    {
      name: "template",
      type: "expand",
      message: "请选择模板",
      choices: [
        {
          name: "react",
          value: "react",
          description: "react模板",
        },
      ],
    },
  ])
  .then((answers) => {
    console.log(answers, "answers");
  });

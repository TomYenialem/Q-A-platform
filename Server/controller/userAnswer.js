const { StatusCodes } = require("http-status-codes");
const dbConnecttion = require("../Db/dbconfig");
const answer = async (req, res) => {
  const { answer } = req.body;
  const { id } = req.user;
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all fileds required" });
  }

  console.log("Answer:", answer);
  console.log("User ID:", id);
  //  console.log("Question ID:", question_id);
  try {
    const { question_id } = req.params;
    console.log(question_id);
    //  const question = `SELECT question_id FROM Questions WHERE  question_id=?`;
    //  const [question_ids] = await dbConnecttion.query(question, [question_id]);
    //  res.send(question_ids)
    //  if (question_ids.length === 0) {
    //    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
    //  }

    const sendAnswer = `INSERT INTO Answers(answer,user_id,question_id) VALUES (?,?,?)`;
    await dbConnecttion.query(sendAnswer, [answer, id, question_id]);
    return res.status(StatusCodes.ACCEPTED).json({ msg: "answer sent" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "database error" });
  }
};

const allAnswers = async (req, res) => {
  // const {username}=req.user
  try {
    const fetchAllAnswers = `SELECT Questions.title,Questions.descrbition,Answers.user_id,Answers.question_id,USER.username,Answers.answer from Answers JOIN USER on USER.user_id=Answers.user_id JOIN Questions on Answers.question_id=Questions.question_id `;
    const [allAnswers] = await dbConnecttion.query(fetchAllAnswers);
    res.status(StatusCodes.ACCEPTED).json({ allAnswers });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal server error" });
  }
};

module.exports = { answer, allAnswers };

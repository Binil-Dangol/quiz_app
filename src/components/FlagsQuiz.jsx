import React, { useState, useEffect } from "react";
import OptionButton from "./OptionButton";
import axios from "axios";
import QuizLogic from "./QuizLogic";

const FlagsQuiz = () => {
  return <QuizLogic quizType="flag" />;
};

export default FlagsQuiz;
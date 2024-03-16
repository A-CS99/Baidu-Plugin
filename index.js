const express = require('express');
const app = express();

let state = 'not_start';

const types = ['EI', 'SN', 'TF', 'JP'];

const mbtis = [
  { id: 1, name: 'ISTJ', description: '物流师' },
  { id: 2, name: 'ISFJ', description: '守卫者' },
  { id: 3, name: 'INFJ', description: '提倡者' },
  { id: 4, name: 'INTJ', description: '建筑师' },
  { id: 5, name: 'ISTP', description: '鉴赏家' },
  { id: 6, name: 'ISFP', description: '探险家' },
  { id: 7, name: 'INTP', description: '发明家' },
  { id: 8, name: 'INFP', description: '教育家' },
  { id: 9, name: 'ENTJ', description: '指挥官' },
  { id: 10, name: 'ENFJ', description: '演说家' },
  { id: 11, name: 'ENTP', description: '辩论家' },
  { id: 12, name: 'ENFP', description: '活动家' },
  { id: 13, name: 'ESTJ', description: '挑战者' },
  { id: 14, name: 'ESFJ', description: '保护者' },
  { id: 15, name: 'ESFP', description: '表演者' },
  { id: 16, name: 'ESTP', description: '分析师' },
]

const questions = {
  EI: [
    { id: 1, tendency: 'E', question: '你经常交新朋友' },
    { id: 2, tendency: 'E', question: '走到你觉得有趣的人身边，然后开始一段谈话，这会让你感觉很舒服' },
    { id: 3, tendency: 'E', question: '你喜欢参加集体活动' },
    { id: 4, tendency: 'E', question: '与自我成就相比，帮助他人实现目标会让你感觉更快乐' },
    { id: 5, tendency: 'E', question: '你通常更喜欢和别人在一起，而不是独自一人' },
    { id: 6, tendency: 'E', question: '经过漫长而疲惫的一周，一场热闹的社交活动正是你所需要的' },
    { id: 7, tendency: 'E', question: '在你的社交圈里，你经常是联系朋友并发起活动的人' },
    { id: 8, tendency: 'E', question: '你尽量不让别人难堪，即使这完全是他们的错' },
    { id: 9, tendency: 'E', question: '与安静、私密的地方相比，你更喜欢繁忙、热闹的地方' },
    { id: 10, tendency: 'E', question: '你喜欢看人争吵' },
    { id: 11, tendency: 'E', question: '如果你认为别人更需要它，你会把一个好机会让出去' },
    { id: 12, tendency: 'I', question: '在社交活动中，你很少主动去认识新的人，大多数时间都是和已经认识的人交谈' },
    { id: 13, tendency: 'I', question: '你很少担心你是否给人留下好印象' },
    { id: 14, tendency: 'I', question: '你避免在小组环境中扮演领导角色' },
    { id: 15, tendency: 'I', question: '你尽量避免吸引别人的注意力'},
    { id: 16, tendency: 'I', question: '你会避免打电话'},
    { id: 17, tendency: 'I', question: '你喜欢大部分时间都需要你独自完成的工作' },
  ],
  SN: [
    { id: 18, tendency: 'S', question: '即使是一个小错误也会让你怀疑自己的整体能力和知识水平'},
    { id: 19, tendency: 'S', question: '你对讨论创意作品的各种解读和分析不太感兴趣' },
    { id: 20, tendency: 'S', question: '你绝对不是艺术型的人' },
    { id: 21, tendency: 'S', question: '你很少会感觉没有安全感' },
    { id: 22, tendency: 'S', question: '你仍然被你很久以前犯的错误所困扰' },
    { id: 23, tendency: 'S', question: '你很少考虑人类存在的原因或生命的意义' },
    { id: 24, tendency: 'S', question: '你认为思考抽象的哲学问题是浪费时间' },
    { id: 25, tendency: 'S', question: '你相信事情会朝对自己有利的方向发展' },
    { id: 26, tendency: 'N', question: '当讨论变得高度理论化时，你会觉得无聊或失去兴趣' },
    { id: 27, tendency: 'N', question: '你喜欢让你自己解读结局的书籍和电影' },
    { id: 28, tendency: 'N', question: '你对很多事情感兴趣，因此很难选择下一步尝试什么' },
    { id: 29, tendency: 'N', question: '你总是对死后会发生什么事情感到好奇' },
    { id: 30, tendency: 'N', question: '你很少对自己做出的选择产生怀疑'},
    { id: 31, tendency: 'N', question: '你喜欢参观艺术博物馆'},
    { id: 32, tendency: 'N', question: '你经常花很多时间试图理解与你自己截然不同的观点'},
    { id: 33, tendency: 'N', question: '你对有争议的事物非常感兴趣'},
  ],
  TF: [
    { id: 34, tendency: 'T', question: '你通常会保持冷静，即使在很大的压力下'},
    { id: 35, tendency: 'T', question: '你更喜欢用理智做决定，而非情感'},
    { id: 36, tendency: 'T', question: '你认为如果人们更依赖理性，而不是过于依赖自己的感受，世界会变得更好'},
    { id: 37, tendency: 'T', question: '你经常很难理解别人的感受'},
    { id: 38, tendency: 'T', question: '当有人对你评价很高时，你会想知道他们需要多长时间就会对你失望'},
    { id: 39, tendency: 'F', question: '看到别人哭，很容易让你也觉得想哭' },
    { id: 40, tendency: 'F', question: '你非常感性'},
    { id: 41, tendency: 'F', question: '你往往会担心事情会朝着更糟糕的方向发展'},
    { id: 42, tendency: 'F', question: '你的心情会迅速变化'},
    { id: 43, tendency: 'F', question: '你发现自己很容易理解经历与自己截然不同的人'},
    { id: 44, tendency: 'F', question: '你对情绪的控制力不如情绪对你的控制力'},
    { id: 45, tendency: 'F', question: '你一眼就能知道别人的感受'},
    { id: 46, tendency: 'F', question: '你经常感到难以承受'},
  ],
  JP: [
    { id: 47, tendency: 'J', question: '你经常为备用计划再制定一个备用计划' },
    { id: 48, tendency: 'J', question: '你喜欢在完全完成一个项目后，再开始另一个项目' },
    { id: 49, tendency: 'J', question: '你喜欢使用日程表和清单等组织工具'},
    { id: 50, tendency: 'J', question: '你更喜欢先做家务，然后再放松'},
    { id: 51, tendency: 'J', question: '你对效率不如你的人没有耐心'},
    { id: 52, tendency: 'J', question: '你喜欢每天都有一份待办事项清单'},
    { id: 53, tendency: 'J', question: '如果你的计划被打断，你的首要任务是尽快回到正轨' },
    { id: 54, tendency: 'J', question: '你按部就班地完成事情，不遗漏任何步骤' },
    { id: 55, tendency: 'P', question: '你会花很多空闲时间探索各种激起您兴趣的随机主题' },
    { id: 56, tendency: 'P', question: '你做事通常更喜欢随心所欲，而不是按照特定的日常计划' },
    { id: 57, tendency: 'P', question: '你常常在最后一刻才开始行动' },
    { id: 58, tendency: 'P', question: '你通常会尽可能推迟最终决定' },
    { id: 59, tendency: 'P', question: '你的个人工作方式更偏向于自发的能量爆发，而不是有条理的持续努力' },
    { id: 60, tendency: 'P', question: '你很难在最后期限前完成任务' },
  ],
}

app.get('/mbtis', (req, res) => {
  console.log("|GET| /mbtis |");
  res.contentType('application/json');
  res.status(200);
  res.json({
    state: state,
    types: mbtis,
  })
});

app.get('/start', (req, res) => {
  console.log("|GET| /start |");
  res.contentType('application/json');
  res.status(200);
  res.json({
    state: state,
    prompt: "感谢您参与MBTI性格测试, 接下来请您结合自身经历，诚实地针对以下对您的描述做出评分（1-5分）, 分数分别对应:\n1分: 完全不符合\n2分: 不太符合\n3分: 一般\n4分: 比较符合\n5分: 完全符合",
  });
});

app.post('/ask', (req, res) => {
  console.log("|POST| /ask | body: ", req.body, "|");
  res.contentType('application/json');
  res.status(200);
  const { type, index } = req.body;
  const nextTypeIndex = types.indexOf(type) + 1 % 4;
  const nextType = types[nextTypeIndex];
  const nextIndex = type === 'JP' ? index + 1 : index;
  res.json({
    state: state,
    question: questions[type][id].question,
    next: {
      type: nextType,
      index: nextIndex,
    }
  });
});

app.post('/answer', (req, res) => {
  console.log("|POST| /answer | body: ", req.body, "|");
  const { type, index, prevScore, score } = req.body;
  const question = questions[type][index];
  let newScore = prevScore;
  if (question.tendency === type[0]) {
    newScore = prevScore + score;
  } else if (question.tendency === type[1]) {
    newScore = prevScore - score;
  }
  res.contentType('application/json');
  if (question.id === 60) {
    res.status(201);
    state = 'resulting';
    res.json({
      state: state,
      type: type,
      score: newScore,
    });
    return 0;
  }
  res.status(200);
  res.json({
    state: state,
    type: type,
    score: newScore,
  });
})

app.post('/result', (req, res) => {
  console.log("|POST| /result | body: ", req.body, "|");
  const { answers } = req.body;
  let result = '';
  answers.forEach((answer) => {
    if (answer.score > 0) {
      result += answer.type[0];
    } else {
      result += answer.type[1];
    }
  });
  res.contentType('application/json');
  res.status(200);
  state = 'finished';
  res.json({
    state: state,
    result: result,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
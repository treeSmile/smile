window.onload = function () {
  // 所有音乐的地址
  // MusicSrc：歌曲路径
  // MusicName：歌曲名
  // MusicBgSrc:背景图路径
  // MusicSongSrc:歌词背景路径
  let Allmusic = [
    {
      MusicSrc: "music/1.mp3",
      MusicName: "可惜没如果--林俊杰",
      MusicBgSrc: "url(img/disc1.png)",
      MusicSongSrc: "url(img/1.jpg)",
    },
    {
      MusicSrc: "music/2.mp3",
      MusicName: "后来--刘若英",
      MusicBgSrc: "url(img/disc2.png)",
      MusicSongSrc: "url(img/2.jpg)",
    },
    {
      MusicSrc: "music/3.mp3",
      MusicName: "别再闹了--毛不易",
      MusicBgSrc: "url(img/disc3.png)",
      MusicSongSrc: "url(img/3.jpg)",
    },
    {
      MusicSrc: "music/4.mp3",
      MusicName: "我知道你的名字--霈丹（浪哥）",
      MusicBgSrc: "url(img/disc4.png)",
      MusicSongSrc: "url(img/4.jpg)",
    },
    {
      MusicSrc: "music/5.mp3",
      MusicName: "你就不要想起我--田馥甄",
      MusicBgSrc: "url(img/disc5.png)",
      MusicSongSrc: "url(img/5.jpg)",
    },
    {
      MusicSrc: "music/6.mp3",
      MusicName: "阿刁--张韶涵",
      MusicBgSrc: "url(img/disc6.png)",
      MusicSongSrc: "url(img/6.jpg)",
    },
  ];

  // 皮肤地址
  let skinList = [
    "url(img/bg1.jpg)",
    "url(img/bg2.jpg)",
    "url(img/bg3.jpg)",
    "url(img/bg4.jpg)",
    "url(img/bg5.jpg)",
    "url(img/bg6.jpg)",
  ];

  // outerNode：最外层盒子
  // skinNode：皮肤盒子
  // skinShowBtn：皮肤按钮
  // skinHide：隐藏皮肤盒子
  // skinHideItem：所有的皮肤
  // musicName：歌名
  // topBgNode：磁带条、背景图盒子
  // bgLineBtn：磁带条
  // bgBtn：背景图
  // titleBgNode：歌词盒子
  // titleBg：歌词背景
  // titleShow：展示的歌词
  // trueTitleItem：所有歌词的隐藏div
  // nowTime：当前播放时间
  // totalTime：歌曲总时间
  // progressNode：进度条盒子
  // trueLine：真正的进度条
  // voiceNode：声音
  // lastNode：上一首
  // playBtn：播放暂停按钮
  // nextNode：下一首
  // songSheetBtn：歌单
  // songHide：隐藏的歌单
  // songItem：所有歌曲的选择行
  // songCloseBtn：关闭隐藏歌单的按钮
  // 获取元素
  var Ele = {
    // 皮肤部分
    outerNode: document.querySelector(".outerNode"),
    skinNode: document.querySelector(".skinNode"),
    skinShowBtn: document.querySelector(".skin_show"),
    skinHide: document.querySelector(".skin_hide"),
    skinHideItem: document.querySelectorAll(".skin_hide_item"),
    // 歌名部分
    musicName: document.querySelector(".musicName"),
    // 背景、歌词部分
    topBgNode: document.querySelector(".topBgNode"),
    bgLineBtn: document.querySelector(".top_bg_line"),
    bgBtn: document.querySelector(".top_bg"),
    titleBgNode: document.querySelector(".titleBgNode"),
    titleBg: document.querySelector(".title_bg"),
    titleShow: document.querySelector(".title_show"),
    trueTitleItem: document.querySelectorAll(".trueTitle_item"),
    // 进度条、时间部分
    nowTime: document.querySelector(".nowTime"),
    totalTime: document.querySelector(".totalTime"),
    progressNode: document.querySelector(".progressNode"),
    trueLine: document.querySelector(".trueLine"),
    // 音量、上一首、播放暂停、下一首、歌单部分
    voiceNode: document.querySelector(".voiceNode"),
    lastNode: document.querySelector(".lastNode"),
    playBtn: document.querySelector(".playNode"),
    nextNode: document.querySelector(".nextNode"),
    songSheetBtn: document.querySelector(".songSheet"),
    songHide: document.querySelector(".songHide"),
    songItem: document.querySelectorAll(".song_item"),
    songCloseBtn: document.querySelector(".song_close"),
  };

  // 歌曲总数
  var len_music = Allmusic.length;
  // 皮肤总数
  var len_kin = skinList.length;
  // 初始索引
  var index = 0;
  // 控制皮肤的bool值
  var skinLin = true;
  // 控制声音的bool值
  var voiceLin = true;
  // 控制播放的bool值
  var playLin = true;
  //  皮肤定时器
  var skinTimer;
  //  歌单定时器
  var songTimer;

  // 封装隐藏函数   element:元素节点
  function displayNone(element) {
    element.style.display = "none";
  }
  // 封装显示函数   element:元素节点
  function displayBlock(element) {
    element.style.display = "block";
  }
  // 封装少于10前面加0，返回0x   number:数字
  function addZero(number) {
    var add_zero = parseInt(number);
    if (add_zero < 10) {
      add_zero = "0" + add_zero;
    }
    return add_zero;
  }
  //  封装显示时间的格式,返回xx:xx   totaltimes:总时间
  function printTime(totaltimes) {
    var send = parseInt(totaltimes % 60);
    var mind = parseInt(totaltimes / 60);
    return addZero(mind) + ":" + addZero(send);
  }
  // 封装歌词文字颜色函数  songtime:当前播放时间
  function showSong(songtime) {
    var pTiem = Ele.titleShow.childNodes;
    for (var i = 0; i < pTiem.length; i++) {
      var times = pTiem[i].getAttribute("time");
      if (songtime == times) {
        pTiem[i].style.color = "#D92E2E";
        for (var r = 0; r < pTiem.length; r++) {
          if (pTiem[r] != pTiem[i]) {
            pTiem[r].style.color = "#fff";
          }
        }
      }
    }
  }
  // 封装歌词滚动函数   songtime:当前播放时间
  function moveSongSheet(songtime) {
    // 获取歌词显示界面的所有子元素
    var pTiem = Ele.titleShow.childNodes;
    for (var i = 0; i < pTiem.length; i++) {
      // 获取子元素的time属性
      var times = pTiem[i].getAttribute("time");
      if (songtime == times) {
        if (i < 4) {
          Ele.titleShow.style.top = "0px";
        } else {
          var height_top = 41 * (4 - i);
          Ele.titleShow.style.top = "" + height_top + "px";
        }
      }
    }
  }
  //歌词处理函数,返回HTML结构的歌词   lrc:隐藏的歌词的innerHtml
  function handleSongSheet(lrc) {
    var valueHtml = "";
    // 去除[
    var lrcArr = lrc.split("[");
    for (var i = 0; i < lrcArr.length; i++) {
      // 去除]
      var arr = lrcArr[i].split("]");
      // 首项不为（空、制表符、换行符等任何Unicode空白符）的正则
      var parrent = /^\S/;
      if (arr[1] && parrent.exec(arr[1])) {
        // 获取每句歌词的所有时间xx:xx.xx 把.后面的xx分割出来
        var allTime = arr[0].split(".")[0];
        // 把时间转换成秒的形式
        var time_split = allTime.split(":");
        var time = time_split[0] * 60 + time_split[1] * 1;
        // 把歌词组合成html结构
        var value_item = "<p time=" + time + ">" + arr[1] + "</p>";
        valueHtml += value_item;
      }
    }
    return valueHtml;
  }
  // 封装歌单颜色处理函数   index:索引
  function songSheetColor(index) {
    Ele.songItem[index].style.color = "#D92E2E";
    for (var i = 0; i < len_music; i++) {
      if (i != index) {
        Ele.songItem[i].style.color = "#000";
      }
    }
  }
  // 封装音乐播放的函数，返回playLin为false
  function MusicPlay() {
    myAudio.src = Allmusic[index].MusicSrc;
    Ele.musicName.innerHTML = Allmusic[index].MusicName;
    Ele.bgBtn.style.backgroundImage = Allmusic[index].MusicBgSrc;
    Ele.titleBg.style.backgroundImage = Allmusic[index].MusicSongSrc;
    Ele.titleShow.innerHTML = handleSongSheet(
      Ele.trueTitleItem[index].innerHTML
    );
    songSheetColor(index);
    myAudio.play();
    // 播放后playBtn需要更换背景图
    Ele.playBtn.style.backgroundImage = "url(img/pause.png)";
    return (playLin = false);
  }

  // 创建音乐对象
  var myAudio = new Audio();
  // 初始的歌曲路径
  myAudio.src = Allmusic[index].MusicSrc;
  // 初始的歌名
  Ele.musicName.innerHTML = Allmusic[index].MusicName;
  // 初始的背景图路径
  Ele.bgBtn.style.backgroundImage = Allmusic[index].MusicBgSrc;
  // 初始的歌词背景路径
  Ele.titleBg.style.backgroundImage = Allmusic[index].MusicSongSrc;
  // 初始的歌词
  Ele.titleShow.innerHTML = handleSongSheet(Ele.trueTitleItem[index].innerHTML);
  // 初始歌单颜色
  songSheetColor(index);
  // 歌曲加载完，显示歌曲总时间
  myAudio.addEventListener("canplay", function () {
    Ele.totalTime.innerHTML = printTime(myAudio.duration);
  });

  // 点击显示/隐藏皮肤选择
  Ele.skinShowBtn.onclick = function () {
    if (skinLin == true) {
      displayBlock(Ele.skinHide);
      displayNone(Ele.musicName);
      skinLin = false;
    } else {
      displayNone(Ele.skinHide);
      displayBlock(Ele.musicName);
      skinLin = true;
    }
  };
  // 鼠标移出皮肤div,隐藏皮肤选择.1s后执行
  Ele.skinNode.onmouseleave = function () {
    skinTimer = setTimeout(function () {
      displayNone(Ele.skinHide);
      displayBlock(Ele.musicName);
    }, 1000);
  };
  // 1S内移入皮肤div,定时器清除
  Ele.skinNode.onmouseenter = function () {
    clearTimeout(skinTimer);
  };
  // 监听事件,不冒泡；点击子元素，实现子元素的功能，更换相对应的皮肤
  Ele.skinHide.addEventListener(
    "click",
    function (e) {
      var eve = e || event;
      var targetELement = eve.target || eve.srcElement;
      if (targetELement.nodeName.toLowerCase() == "li") {
        for (var i = 0; i < len_kin; i++) {
          if (targetELement === Ele.skinHideItem[i]) {
            Ele.outerNode.style.backgroundImage = skinList[i];
          }
        }
      }
    },
    false
  );

  // 点击歌单按钮显示隐藏歌单
  Ele.songSheetBtn.onclick = function () {
    displayBlock(Ele.songHide);
  };
  // 点击关闭按钮隐藏歌单
  Ele.songCloseBtn.onclick = function () {
    displayNone(Ele.songHide);
  };
  // 鼠标移出div隐藏歌单,1S后执行
  Ele.songHide.onmouseleave = function () {
    songTimer = setTimeout(function () {
      displayNone(Ele.songHide);
    }, 1000);
  };
  // 1S内移入，清除定时器
  Ele.songHide.onmouseenter = function () {
    clearTimeout(songTimer);
  };

  // 歌曲播放时，与歌词的时间比较进行歌词颜色处理与滚动处理
  myAudio.addEventListener("timeupdate", function () {
    var music_time = parseInt(myAudio.currentTime);
    if (Ele.titleShow.innerHTML) {
      showSong(music_time);
      moveSongSheet(music_time);
    }
  });

  // 歌曲播放时,真正的进度条的长度，显示当前播放时间
  myAudio.addEventListener("timeupdate", function () {
    Ele.trueLine.style.width =
      (myAudio.currentTime / myAudio.duration) * 100 + "%";
    Ele.nowTime.innerHTML = printTime(myAudio.currentTime);
  });

  // 播放、暂停按钮事件
  Ele.playBtn.onclick = function () {
    if (playLin == true) {
      Ele.bgLineBtn.className = "top_bg_line line_on";
      Ele.bgBtn.className = "top_bg bg_play";
      this.style.backgroundImage = "url(img/pause.png)";
      myAudio.play();
      playLin = false;
    } else {
      Ele.bgLineBtn.className = "top_bg_line line_off";
      Ele.bgBtn.className = "top_bg";
      this.style.backgroundImage = "url(img/play.png)";
      myAudio.pause();
      playLin = true;
    }
  };

  // 点击背景图，隐藏背景图盒子，显示歌词盒子，同时歌名top值改为25px;
  Ele.bgBtn.onclick = function () {
    Ele.topBgNode.style.opacity = "30%";
    setTimeout(function () {
      Ele.titleBgNode.style.opacity = "100%";
    }, 1200);
    setTimeout(function () {
      displayNone(Ele.topBgNode);
    }, 1000);
    setTimeout(function () {
      displayBlock(Ele.titleBgNode);
    }, 1000);
    Ele.musicName.style.top = "25px";
  };

  // 点击歌词盒子，隐藏歌词盒子，显示背景图盒子，同时歌名top值改为10px;
  Ele.titleBgNode.onclick = function () {
    Ele.titleBgNode.style.opacity = "30%";
    setTimeout(function () {
      Ele.topBgNode.style.opacity = "100%";
    }, 1200);
    setTimeout(function () {
      displayNone(Ele.titleBgNode);
    }, 1000);
    setTimeout(function () {
      displayBlock(Ele.topBgNode);
    }, 1000);
    Ele.musicName.style.top = "10px";
  };

  //  歌曲唱完自动切换歌曲
  myAudio.addEventListener("timeupdate", function () {
    if (myAudio.currentTime == myAudio.duration) {
      index++;
      if (index == len_music) {
        index = 0;
      }
      MusicPlay();
    }
  });

  // 点击上一首按钮，进行上一首歌事件
  Ele.lastNode.onclick = function () {
    index--;
    if (index == -1) {
      index = len_music - 1;
    }
    MusicPlay();
  };

  // 点击下一首按钮，进行下一首歌事件
  Ele.nextNode.onclick = function () {
    index++;
    if (index == len_music) {
      index = 0;
    }
    MusicPlay();
  };

  // 点击进度条外框，进度条达到点击位置且歌曲进度跟着更改
  Ele.progressNode.onclick = function (e) {
    var eve = e || event;
    myAudio.currentTime =
      myAudio.duration *
      ((eve.clientX - (Ele.outerNode.offsetLeft + this.offsetLeft)) /
        this.offsetWidth);

    Ele.trueLine.style.width =
      ((eve.clientX - (Ele.outerNode.offsetLeft + this.offsetLeft)) /
        this.offsetWidth) *
        100 +
      "%";
  };

  // 音乐声音开关事件
  Ele.voiceNode.onclick = function () {
    if (voiceLin == true) {
      myAudio.volume = 0;
      this.style.backgroundImage = "url(img/slient.png)";
      voiceLin = false;
    } else {
      myAudio.volume = 1;
      this.style.backgroundImage = "url(img/voice.png)";
      voiceLin = true;
    }
  };

  // 点击歌单，歌曲跳转
  Ele.songHide.addEventListener(
    "click",
    function (e) {
      var eve = e || event;
      var targetELement = eve.target || eve.srcElement;
      if (targetELement.className == "song_item") {
        for (var i = 0; i < len_music; i++) {
          if (targetELement === Ele.songItem[i]) {
            index = i;
            MusicPlay();
          }
        }
      }
    },
    false
  );
};

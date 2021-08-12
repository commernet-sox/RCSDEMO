//画agv地图
function drawAgvMap(context, canvas, flowdata) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //1、计算xy的数据
  var rows = flowdata.length;
  var cols = flowdata[0].data.length;
  var canvasW = canvas.width;
  var canvasH = canvas.height;
  console.log(canvasW, canvasH)
  var spacex = canvasW / cols;
  var spacey = canvasH / rows;
  var space = 0;
  var margin = 0;
  var data={space:0,box:6};
  if (spacex < spacey) {
    //竖向居中
    data.space = spacex;
    margin = (canvasH - rows * data.space) / 2;
    flowdata.forEach(function (row) {
      var y = (data.space / 2) + (row.row * data.space) + margin;
      for (var i = 0; i < row.data.length; i++) {
        var x = (i * data.space) + (data.space / 2);
        row.data[i].x = x;
        row.data[i].y = y;
      }
    });
  }
  else {
    //横向居中
    data.space = spacey;
    margin = (canvasW - cols * data.space) / 2;
    flowdata.forEach(function (row) {
      var y = (data.space / 2) + (row.row * data.space);
      for (var i = 0; i < row.data.length; i++) {
        var x = (i * data.space) + (data.space / 2) + margin;
        row.data[i].x = x;
        row.data[i].y = y;
      }
    });
  }
  console.log(spacex, spacey, data.space)

  //console.log(flowdata)
  //2.画网格元素
  flowdata.forEach(function (row, rowIndex) {
    //row.y = row.y ? row.y : ( rowIndex==0 ? initTop + initSpaceH : initTop + initSpaceH*rowIndex);
    row = drawRowChart(context, row,data.box);  //画图形
  });
  //3、添加要指向的对象，必须要在画完所有图形之后
  flowdata.forEach(function (row) {
    row.data.forEach(function (item) {
      if (item.arrowArr && item.arrowArr.length) {
        item.arrowArr.forEach(function (mItem) {
          mItem = addToObj(mItem, flowdata);
        })
      }
    })
  });
  //4、给所有图形画上对应的画箭头，必须要在前两步完成之后
  flowdata.forEach(function (row, rowIndex) {
    row.data.forEach(function (item) {
      if (item.arrowArr && item.arrowArr.length) {
        drawSingleArrow(context, item);//画箭头
      }
    })
  });
  return data;
}
//缩放地图
function wheelMap(context, canvas, flowdata, scale) {
  console.log("重新绘制画图。。。")
  context.clearRect(0, 0, canvas.width * scale, canvas.height * scale);
  //1、计算xy的数据
  var rows = flowdata.length;
  var cols = flowdata[0].data.length;
  var canvasW = canvas.width * scale;
  var canvasH = canvas.height * scale;
  console.log(canvasW, canvasH)
  var spacex = canvasW / cols;
  var spacey = canvasH / rows;
  var space = 0;
  var margin = 0;
  var data={space:0,box:6};
  data.box*=scale;
  //竖向居中
  data.space = spacex;
  margin = (canvasH - rows * data.space) / 2;
  flowdata.forEach(function (row) {
    var y = (data.space / 2) + (row.row * data.space) + margin;
    for (var i = 0; i < row.data.length; i++) {
      var x = (i * data.space) + (data.space / 2);
      row.data[i].x = x;
      row.data[i].y = y;
    }
  });

  console.log(spacex, spacey, data.space)

  console.log("计算完成",flowdata)
  //2.画网格元素
  flowdata.forEach(function (row, rowIndex) {
    //row.y = row.y ? row.y : ( rowIndex==0 ? initTop + initSpaceH : initTop + initSpaceH*rowIndex);
    row = drawRowChart(context, row,data.box);  //画图形
  });
  //3、添加要指向的对象，必须要在画完所有图形之后
  flowdata.forEach(function (row) {
    row.data.forEach(function (item) {
      if (item.arrowArr && item.arrowArr.length) {
        item.arrowArr.forEach(function (mItem) {
          mItem = addToObj(mItem, flowdata);
        })
      }
    })
  });
  //4、给所有图形画上对应的画箭头，必须要在前两步完成之后
  flowdata.forEach(function(row,rowIndex){
      row.data.forEach(function(item){
        if(item.arrowArr && item.arrowArr.length){
          drawSingleArrow(context,item);//画箭头
        }
      })
  });
  return data;
}
//移动地图
function moveMap(context, canvas, flowdata, movex, movey,box) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //1、计算xy的数据
  var rows = flowdata.length;
  var cols = flowdata[0].data.length;
  var canvasW = canvas.width;
  var canvasH = canvas.height;
  //console.log(canvasW,canvasH)
  var spacex = canvasW / cols;
  var spacey = canvasH / rows;
  var space = 0;
  var margin = 0;
  var data={space:0,box:6};
  data.box=box;
  //x,y偏移
  flowdata.forEach(function (row) {
    for (var i = 0; i < row.data.length; i++) {
      row.data[i].x = row.data[i].x + movex;
      row.data[i].y = row.data[i].y + movey;
    }
  });

  //console.log(spacex,spacey,space)

  //console.log(flowdata)
  //2.画网格元素
  flowdata.forEach(function (row, rowIndex) {
    //row.y = row.y ? row.y : ( rowIndex==0 ? initTop + initSpaceH : initTop + initSpaceH*rowIndex);
    row = drawRowChart(context, row,data.box);  //画图形
  });
  //3、添加要指向的对象，必须要在画完所有图形之后
  flowdata.forEach(function (row) {
    row.data.forEach(function (item) {
      if (item.arrowArr && item.arrowArr.length) {
        item.arrowArr.forEach(function (mItem) {
          mItem = addToObj(mItem, flowdata);
        })
      }
    })
  });
  //4、给所有图形画上对应的画箭头，必须要在前两步完成之后
  flowdata.forEach(function(row,rowIndex){
      row.data.forEach(function(item){
        if(item.arrowArr && item.arrowArr.length){
          drawSingleArrow(context,item);//画箭头
        }
      })
  });
  return data;
}

//画每一行的图形
function drawRowChart(context, row,box) {
  row.data.forEach(function (item, index) {
    var s = null;
    s = new Step(context, item.x, item.y, item,box);
    item.chartObj = s;
  })
  return row;
}

//Step 矩形对象
function Step(context, x, y, item,box) {
  this.flag = "step";
  this.h = box;
  this.w = box;
  this.x = x;
  this.y = y;
  if (item.show != undefined && !item.show) {
    console.log(item)
    context.globalAlpha = 0;
  }
  else {
    context.globalAlpha = 1;
  }
  context.lineWidth = 1;
  if (item.color != undefined && item.color != "") {
    context.fillStyle = item.color;
  }
  else {
    context.fillStyle = "#f1bbc4";//5B9BD5
  }
  //context.fillStyle = "#aaaaaa";//5B9BD5
  context.fillRect(x, y, this.w, this.h);

}

//处理每一个箭头需要指向的对象
function addToObj(arrObj, flowData) {
  flowData.forEach(function (rows) {
    rows.data.forEach(function (item) {
      if (item.name == arrObj.to) {
        //console.log(item.name,arrObj.to)
        arrObj.toObj = item.chartObj;
      }
    })
  })
  return arrObj;
}

//画每个图形的箭头指向
function drawSingleArrow(context, data) {
  var step1 = data.chartObj;
  if (data.arrowArr && data.arrowArr.length) {
    data.arrowArr.forEach(function (item) {
      step1[item.arrow](item.toObj, context);
    })
  }
}

//箭头从step矩形bottom——>top
Step.prototype.drawBottomToTop = function (obj, context) {
  if (obj.flag == "step") {
    var arrow = new Arrow(this.x + obj.w / 2, this.y + obj.h, this.x + obj.w / 2, obj.y);
    //console.log(this.x + obj.w / 2, this.y + obj.h, this.x + obj.w / 2, obj.y)
    //console.log(this.x,this.y,obj.w,obj.h,obj.x,obj.y)
    arrow.drawBottomToTop(context);
  }
}
//箭头从step矩形right——>left
Step.prototype.drawRightToLeft = function (obj, context) {
  var arrow = null;
  if (obj.flag == "step") {
    arrow = new Arrow(this.x + obj.w, this.y + obj.h / 2, obj.x, obj.y + obj.h / 2);
  }
  arrow.drawLeftToRightOrRightToLeft(context);
}

function Arrow(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.tmpX1 = null;
  this.tmpY1 = null;
  this.tmpX2 = null;
  this.tmpY2 = null;
  this.color = "#ffffff";

}
//第一个拐点
Arrow.prototype.setP1 = function (tmpX1, tmpY1) {
  this.tmpX1 = tmpX1;
  this.tmpY1 = tmpY1;
}
//第二个拐点
Arrow.prototype.setP2 = function (tmpX2, tmpY2) {
  this.tmpX2 = tmpX2;
  this.tmpY2 = tmpY2;
}
Arrow.prototype.setColor = function (color) {
  this.color = color;
}

Arrow.prototype.drawBottomToTop = function (context) {
  if (this.x1 != this.x2) {
    //console.log("drawBottomToTop",this.x1,this.x2)
    //this.setP1(this.x1,(this.y1+this.y2)/2);
    //this.setP2(this.x2,(this.y1+this.y2)/2);
    //this.draw(context);
  } else {
    this.draw(context);
  }
}
Arrow.prototype.drawLeftToRightOrRightToLeft = function (context) {
  if (this.y1 != this.y2) {
    //console.log("drawLeftToRightOrRightToLeft",this.y1,this.y2)
    // this.setP1((this.x1+this.x2)/2,this.y1);
    // this.setP2((this.x1+this.x2)/2,this.y2);
    // this.draw(context);
  } else {
    this.draw(context);
  }
}

Arrow.prototype.draw = function (context) {
  //console.log('draw...')
  // arbitrary styling
  context.strokeStyle = this.color;//设置线条的颜色
  //context.fillStyle = this.color;
  context.lineWidth = 1;// 设置线条的宽度
  // draw the line
  context.beginPath();
  context.moveTo(this.x1, this.y1);//起点
  //console.log(this.tmpX1,this.tmpY1,this.tmpX2,this.tmpY2)
  context.lineTo(this.x2, this.y2);//终点
  context.closePath();
  context.stroke();
}
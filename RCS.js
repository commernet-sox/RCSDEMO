//画agv地图
function drawAgvMap(context,canvas,flowdata){
    //1、计算xy的数据
    var rows=flowdata.length;
    var cols=flowdata[0].data.length;
    var canvasW=canvas.width;
    var canvasH=canvas.height;
    flowdata.forEach(function(row){
        var y=(canvasH/rows/2)+(row.row*canvasH/rows);
        for(var i=0;i<row.data.length;i++){
            var x=(i*canvasW/cols)+(canvasW/cols/2);
            row.data[i].x=x;
            row.data[i].y=y;
        }

    });
    console.log(flowdata)
    //2.画网格元素
    flowdata.forEach(function(row,rowIndex){
        //row.y = row.y ? row.y : ( rowIndex==0 ? initTop + initSpaceH : initTop + initSpaceH*rowIndex);
        row = drawRowChart(context, row);  //画图形
    });
}

function drawRowChart(context,row){
    row.data.forEach(function(item,index){
        var s = null;
        s = new Step(context,item.x,item.y,item);
        item.chartObj = s;
    })
    return row;
}

 //Step 矩形对象
 function Step(context,x, y, item) {
    this.flag = "step";
    //var textStyle = textSize('14px','微软雅黑',item.text);
    var w = 4;
    this.h = 4;
    this.w = w;
    this.x = x;
    this.y = y;
    //this.text = item.text;
    this.range = calRange(this);
    if(item.show!=undefined && !item.show)
    {
        context.globalAlpha=0;
    }
    else
    {
        context.globalAlpha=1;
    }
    context.lineWidth=1; //设置笔触线条的宽度
    context.strokeStyle= item.color ? (item.color.borderColor ? item.color.borderColor: '#5B9BD5'):'#5B9BD5' ; //边框颜色
    context.strokeRect(x - this.w / 2, y - this.h / 2, this.w, this.h);
    //console.log(x - this.w / 2, y - this.h / 2, this.w, this.h)
    //context.fillStyle = item.color ? (item.color.bgColor ? item.color.bgColor: 'rgba(91,155,213,0.5)'):'white' ; //背景颜色
    //context.fillRect(x - this.w / 2, y - this.h / 2,this.w,this.h);
    //context.fillStyle = item.color ? (item.color.fontColor ? item.color.fontColor: '#5B9BD5'):'#5B9BD5' ; //文字颜色
    //context.textAlign = 'center';
    //context.font = 'normal 14px 微软雅黑';
    //if(item.text){context.fillText(item.text,x, y+4);}
  }

   //每个对象的坐标范围
   function calRange(obj){
    var newObj = {
      minX:obj.x-obj.w/2,
      maxX:obj.x+obj.w/2,
      minY:obj.y-obj.h/2,
      maxY:obj.y+obj.h/2
    }
    return newObj;
  }


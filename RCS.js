//画agv地图
function drawAgvMap(context,canvas,flowdata){
    //1、判断是否有需要平均计算x的数据
    flowdata.forEach(function(row){
        if(row.isAverage){
            row.data=calChartX(canvas.width,row,data,row.y)
        }
    });
}
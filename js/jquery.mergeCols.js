
/*
* 作者: i33 2013-05-15
* 说明:依赖jquery
* 调用:
* ('#tableid').mergeCols(1,[2,3,5])
* 
* 参数说明:
* @param 主列,按此列合并分组,别的列合并时.以此列的合并为标准界限,不能跨组合并
* @param 合并列的数组 [2,3,4]将2,3,4列合扫行合并,列数从1开始 1 2 3....
* 
* 注意:  合并时如果所有列全部执行合并,一定要有行号,保证数据完整性.因为如果没有行号.合并后有可能行数组会减少
*/
;(function($){
	var types = [];//根据主列来记录分隔行的数组
    var mergerCols=[];
    var $mainCol;

	$.fn.mergeCols = function(main,cols){
		var that = this; 
		$mainCol = $(_formatString(main),that);
		$.each(cols,function(){
	        mergerCols.push($(_formatString(this),that));
	    })
		
		//合并主列,并且根据主列记录分组的行数
		for(var count = $mainCol.length - 1 , row = 1; count >= 0 ; count--){
	        var $tmp = $($mainCol[count]);
	        if(count == 0){
	          types.push(0) ;
	          $tmp.attr('rowspan',row);
	         
	        }else if($mainCol.get(count).innerText != $mainCol.get(count-1).innerText){
	          $tmp.attr('rowspan',row);
	          row = 1;
	          types.push(count) ;
	        }else{
	          $tmp.remove();
	          row++;
	        }
        }

        $.each(mergerCols,function(){
          _mergeCols(this);
        })
	}

	//格式化选择字符串
	var _formatString = function(str){
		return 'tbody>tr>td:nth-child('+ str +')';
	}

	//私有方法,合并列用
	var _mergeCols = function(arr){

		for(var count = arr.length - 1 , row = 1; count >= 0 ; count--){

          var $tmp2 = $(arr[count]);
          if(count == 0){
            $tmp2.attr('rowspan',row);
           
          }else if( $.inArray(count,types)>=0 || arr.get(count).innerText != arr.get(count-1).innerText ){
            $tmp2.attr('rowspan',row);
            row = 1;
          }else{
            $tmp2.remove();
            row++;
          }
        }
	}
})(jQuery)
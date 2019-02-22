var playerList=[];
var playerInfo = [];


// 각 항목에서 선택된 값을 가져와서 객체로 리턴하는 함수
function findPlayer() {
    let selectedYear = $('#yearSelect').find('option:selected').text();
    let selectedTeam = $('#team').find('option:selected').text();
    let selectedHorP = $('#hp').find('option:selected').text();
    let selectedPosition = $('#position').find('option:selected').text();

    return {
        'selectedYear': selectedYear,
        'selectedTeam': selectedTeam,
        'selectedHorP': selectedHorP,
        'selectedPosition': selectedPosition
    };
}


$(document).ready(function() {

        $('.search').click(function (){
        var params = $('.searchStr').val();
        console.log(params);
        $.ajax({
        	 url:'game/SearchPlayer/',
            type:'POST',
            dataType: "json",
            contentType : 'application/x-www-form-urlencoded; charset=utf-8',
            data : {'searchStr' : params},

         	success:function(data) {
         	console.table(data);
            $('#output').empty();
        	 $.each(data, function(index, item){
					var output = '';

                    output += '<div class="row">';
                    output += '<div style="float:left;">';
                    output += item.year + ', ';
                    output += item.team + ', ';
                    output += item.position + ', ';
                    output += item.player;
                    output += '</div>';
                    output += '<button type="button" class="btn btn-dark playerCheck" id="">추가</button>';
					output += '</div>';
					output += '<hr/>';



					console.log("output:" + output);

					$('#output').append(output);
				});
				console.table(playerInfo);
			},
			error:function(){
				alert("ajax통신 실패!!!");
			}
		});

    });
    /*on 태그가 동적?생성시 사용*/
    /*$('#playerCheck').on(function (){*/
    /*추가버튼 누를때*/
    $(document).on("click",".playerCheck",function(){

        /*var test = []
        test.push(document.getElementById('#output.val'));
        alert(test[0]);*/


        var players;
        var isData;
        var selectTeam = $('#selectTeam option:selected').text();
        var teamIdx = $('#selectTeam option:selected').attr('name');
        var selectPlayer = this.previousElementSibling.innerHTML; /*this : 누른 데이터의 클래스를 가르킨다. / nextElementSibling : 다음형제 - 자식을건너뛰고 의정보 <->previousElementSibling : 이전형제의정보/ innerHTML : 글*/
        console.log(selectPlayer);
        var selectPlayerList = selectPlayer.split(',') // 배열로 리턴된다
        console.log(selectPlayerList);
        var li = ['aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll']



        for(var i=1; i<=12; i++){
                p = $('#team'+teamIdx+' li:nth-child('+i+')')
                isData = $.inArray(p.attr('name'), li)       //이 리스트에 p.attr('name')가 몇번째 위치에 있는지 인덱스값반환, 리스트에 없으면 -1
                if(isData >= 0 )
                    li.splice(isData, 1);
            }



        /*js : findIndex함수*/
        var checkInfo = playerInfo.findIndex(x => x.toString() == selectPlayerList.toString()); /*toString 배열의 요소값을 비교하기위해서*/

                console.log(checkInfo);
                if (checkInfo == -1) {
                    playerInfo.push(selectPlayerList);
                }
        /*js : findIndex함수 끝*/

        if (selectTeam == '팀선택'){
            alert('팀을 선택해주세요')
        }
        else{
            for(var i=1; i<=12; i++){
                players = $('#team'+teamIdx+' li:nth-child('+i+')').text();
            }



            for(var i=0; i<=12; i++){
                /*타자 1~9*/
                /*selectPlayerList.splice(0,0,li[0]);*/
                 players = $('#team'+teamIdx+' li:nth-child('+i+')').text(); //*li:nth-child : list가 몇번쨰인지.*//* *//*'#team'+teamIdx+' : team1 or team2*/
                if(players ==  'Player' && i <= 9 && selectPlayerList[2] != ' undefined'){
                    $('#team'+teamIdx+' li:nth-child('+i+')').text(selectPlayerList[3]);
                    playerList.push(selectPlayerList);
                    selectPlayerList.splice(1,0,selectPlayerList[0]);
                    selectPlayerList.splice(2,0,'타자')
                    selectPlayerList.splice(0,1,li[i-1]);
                    break;
                }
                /*투수 10~12*/
                else if (players ==  'Player' && (i>9 && i<=12) && selectPlayerList[2] == ' undefined'){
                    $('#team'+teamIdx+' li:nth-child('+i+')').text(selectPlayerList[3]);
                    playerList.push(selectPlayerList);
                    selectPlayerList.splice(1,0,selectPlayerList[0]);
                    selectPlayerList.splice(2,0,'투수');
                    selectPlayerList.splice(0,1,li[i-1]);
                    break;
                }
            }
        }

    });


    /* >>>>>>>>>>>>>>>>>>>>>>>> 연도로 팀 검색 <<<<<<<<<<<<<<<<<<<<<<<< */

    $(document).on('change', '#yearSelect', function () {
        let selectedYear = $(this).find('option:selected').text();

        console.log(selectedYear);
        $.ajax({
            url:'searchByYear/',              //game : 앱이름
            type:'POST',
            dataType: "json",
            contentType : 'application/x-www-form-urlencoded; charset=utf-8',
            data : {'year' : selectedYear},
            success:function(data) {
                $('#team').empty();
                console.table(data)
                $.each(data, function(index, item){
                   var output = '<option>';
                   output += item;
                   output += '</option>';
                   $('#team').append(output);
                });

                console.table(playerList);
            },
            error:function(){
                alert("ajax통신 실패!!!");
            }
        });
    });

    /* >>>>>>>>>>>>>>>>>>>>>>>> 연도로 팀 검색 끝<<<<<<<<<<<<<<<<<<<<<<<< */


    /* >>>>>>>>>>>>>>>>>>>>>>>> 선수명 가져오기 <<<<<<<<<<<<<<<<<<<<<<<< */

     $(document).on('change', '#hp', function () {
        let selectedInputs = findPlayer();

        // 타자와 투수 검색할 경우에 충족되지 않은 항목 있는지 체크하기 위한 리스트
        const defaultList = ['년도선택', '팀별검색', '타자/투수'];

        // 선택된 option 태그들의 값들 중에 defaultList,
        // 즉 선택되지 않은 것들을 원소로하는 배열을 리턴한다.
        let isDefault = Object.values(selectedInputs).filter(input => defaultList.indexOf(input) != -1 )

        if (isDefault.length == 0) {
            if (selectedInputs['selectedHorP'] == '투수' &&
                            selectedInputs['selectedPosition'] == '포지션') {
                $.ajax({
                    url:'getPitchers/',              //game : 앱이름
                    type:'POST',
                    dataType: "json",
                    contentType : 'application/x-www-form-urlencoded; charset=utf-8',
                    data : {
                        'year': selectedInputs['selectedYear'],
                        'team': selectedInputs['selectedTeam'],
                    },
                    success:function(data) {
                        $('#player').empty();
                        $.each(data, function(index, item){
                           var output = '<option>';
                           output += item.player;
                           output += '</option>';
                           $('#player').append(output);
                        });

                        console.table(playerList);
                    },
                    error:function(){
                        alert("ajax통신 getPitchers 실패!!!");
                    }
                });
            }
        }
    });


    $(document).on('change', '#position', function() {
        let selectedInputs = findPlayer();

        // 타자와 투수 검색할 경우에 충족되지 않은 항목 있는지 체크하기 위한 리스트
        const defaultList = ['년도선택', '팀별검색', '타자/투수', '포지션'];

        let isDefault = Object.values(selectedInputs).filter(input => defaultList.indexOf(input) != -1 )

        if (isDefault.length == 0 && selectedInputs['selectedHorP'] != '투수') {
            $.ajax({
                url:'getBatters/',              //game : 앱이름
                type:'POST',
                dataType: "json",
                contentType : 'application/x-www-form-urlencoded; charset=utf-8',
                data : {
                    'year': selectedInputs['selectedYear'],
                    'team': selectedInputs['selectedTeam'],
                    'position': selectedInputs['selectedPosition']
                },
                success:function(data) {
                    $('#player').empty();
                    $.each(data, function(index, item){
                       var output = '<option>';
                       output += item.player;
                       output += '</option>';
                       $('#player').append(output);
                    });

                    console.table(playerList);
                },
                error: function() {
                    alert("ajax통신 getBatters 실패!!!");
                }
            })
        }
    })

    /* >>>>>>>>>>>>>>>>>>>>>>>> 포지션이 투수일 때 선수명 가져오기 끝<<<<<<<<<<<<<<<<<<<<<<<< */

    $( ".sortable" ).sortable({
        revert: true
    });
    $( "#draggable" ).draggable({
        connectToSortable: "#.sortable",
        helper: "clone",
        revert: "invalid"
    });

    $( "ul, li" ).disableSelection();

    $( "#Result" ).on( "click", function() {
        if($('#Result').attr('name') == 1){
            $( "#effect" ).hide( 'Blind');
            $('#Result').attr('name',0)
        }else{
            $( "#effect" ).show( 'Blind');
            $('#Result').attr('name',1)
        }
    });

    $( "#effect" ).hide( 'Blind');

    //추가하기 버튼 눌렀을 때
    $('#search2').on('click', function(){
        var players;
        var isData;
        var detail=[];
        var selectMyTeam = $('#myTeam option:selected').text();
        var selectYear = $('#yearSelect option:selected').text();
        var selectTeam = $('#team option:selected').text();
        var selectHp = $('#hp option:selected').text();
        var selectPosition = $('#position option:selected').text();
        var selectPlayer = $('#player option:selected').text();
        var teamIdx = $('#myTeam option:selected').attr('name');
        var li = ['aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll']

        if(selectMyTeam != '팀정하기' && selectPlayer != '선수명'){

            if(playerList.length == 24)     // >>>>>>>>>>>>>>>>>>>>>>>> 12는 뭘 의미??
                return null;

            for(var i=1; i<=12; i++){
                p = $('#team'+teamIdx+' li:nth-child('+i+')')
                isData = $.inArray(p.attr('name'), li)       //이 리스트에 p.attr('name')가 몇번째 위치에 있는지 인덱스값반환, 리스트에 없으면 -1
                if(isData >= 0 )
                    li.splice(isData, 1);
            }

            for(var i=1; i<=12; i++){
                p = $('#team'+teamIdx+' li:nth-child('+i+')')
                players = p.text();
                if(players == 'Player'){

                    p.text(selectPlayer);
                    p.attr('name',li[0])
                    detail.push(li[0])
                    detail.push(selectYear)
                    detail.push(selectTeam)
                    detail.push(selectHp)
                    detail.push(selectPosition)
                    detail.push(selectPlayer)

                    break;
                }

            }   //for문 끝

            playerList.push(detail)

        }else{
            alert('조건을 모두 선택해주세요');
        }
    });



    // 선수 목록에서 삭제할 때
    $('.delete button').on('click', function(){
        var isData;
        var idx = $(this).val();
        var teamIdx = $(this).attr('name');
        var p = $("#team"+ teamIdx +" li:nth-child("+idx+")");

        if(p.text() == 'Player')
            return null;

        for(var i=0; i< playerList.length; i++){
            isData = $.inArray(p.attr('name'), playerList[[i]]);
            if(isData == 0 ){
                playerList.splice(i,1);
                p.attr('name','');

                break;
            }
        }
        p.text('Player');
    });

    //record-tab
    $( function() {
        $( "#tabs" ).tabs();
    });

    //Game Start 버튼 눌렀을 때
    /*$('#start').on('click', function(){
        var i;
        var players;
        var check;
        var teamIdx;

    Outer:
        for(teamIdx=1; teamIdx<=2; teamIdx++){
            for(i=1; i<=2; i++){                        // 2 ->12로 바꿔라
                players = $('#team'+ teamIdx +' li:nth-child('+i+')').text();
                if(players == 'Player'){
                    alert('12명의 선수를 모두 선택해주세용');
                    break Outer;
                }
//                if($('#t'+teamIdx+'Name').val() == ''){
//                    alert('팀의 이름을 정해주세요');
//                    break Outer;
//                }
            }
            if(teamIdx == 2)
                check = 1;
        }

        var score_1 = [10,10,10,0,2,2,1,1,0,49,8,4,5]
        var score_2 = [1,2,7,0,5,0,4,1,'-',20,11,0,4]
        if (check == 1){
            $('#result').attr('disabled', true);    // 게임시작하면 끝날 때까지 기록보기버튼 비활성화시키기


            $("#effect" ).hide( 'Blind');           //주요 기록 숨기기


        }

    $('#result').attr('disabled', false);
    });*/


    // 주요기록보기 버튼눌렀을 때
    $('#Result').on('click', function(){
        var teamIdx;
        var teamName =[];

        for(teamIdx=1; teamIdx<=2; teamIdx++){
            teamName.push($('#score_board tbody tr:nth-child(' +teamIdx+ ') > th').text())
        }

        html = ''
        html += '<h4>'+teamName[0]+'</h4>'
        html += '<p>'+$('#score_board tbody tr:nth-child(1) >td:nth-child(2)').text() +'</p>'
        html += '<h4>'+teamName[1]+'</h4>'
        html += '<p>'+$('#score_board tbody tr:nth-child(2) >td:nth-child(2)').text() +'</p>'
        //alert(html)
        //$('#record_tab #tabs-1 p').html(html);

    });


});   //$ready문 끝


/*
    请求发送函数
*/
var getDatas = function() {
    return new Promise((resolve,reject) => {
        $.ajax({
            url: "http://localhost:3000/getInformation",
            type: "get",
            data: {},
            success: function(data) {
                console.log("success" + data);
                resolve(data);
            },
            error: function(data) {
                console.log("error" + data);
                reject(data);
            }
        })
    })
}

/*
    字符串修整函数(修整表格中的字符串以方便显示)
*/
var clipStr = function(str) {
    if(str.length < 50) {
        return str;
    }
    let prev = str.substr(0,20);
    let nail = str.substr(-20);
    return prev + "....." + nail;
}

/*
    总引用函数
*/
const specCharUIMod = {
    basButSwiftInit: function(id) {
        let basButton = $(`#${id}`);
        
    },
    textAreaInit: function(id) {
        let textArea = $(`#${id}`);
        let tbody = $(".modal-content > table > tbody");
        tbody.html("载入中");
        let data = getDatas().then((datas) => {
            tbody.html("");
            for(let i in datas) {
                let tr = 
                `
                    <tr>
                        <td>${i}</td>
                        <td>${clipStr(datas[i].markdown)}</td>
                        <td>${datas[i].renderHtml}</td>
                        <td>${(datas[i].remark) ? datas[i].remark : ""}</td>
                        <td>
                            <button>选择</button>
                        </td>
                    </tr>
                `;
                tbody.append(tr);
            }
        })
    }
}
specCharUIMod.textAreaInit("a");


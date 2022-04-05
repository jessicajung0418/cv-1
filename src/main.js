// 获取html。这个函数的原理：通过CSS选择器找到html
let html = document.querySelector('#html');
let style = document.querySelector('#style');

// 加/* 的原因：因为在style.innerHTML = string.substring(0, n);这行代码时，是加CSS样式，中文会对样式产生影响，所以要给中文加上CSS的注释符号
let string = `/* 你好，我是猫
 * 接下来我演示一下我的前端功底
 * 首先我要准备一个div
*/
#div1 {
    border: 1px solid red;
    width: 200px;
    height: 200px;
}
/* 接下来我要把div变成一个八卦图
 * 注意看好了
 * 首先第一步，把div变成一个圆
*/
#div1 {
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    border: none
}
/* 第二步：添加渐变色
 * 搜索CSS Gradient，找到白色渐变为黑色的位置
 * 复制第二行生成的代码（第一行没用）
*/
#div1 {
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);
}
/* 加两个风火轮 */
#div1::before {
    width: 100px;
    height: 100px;
    /* 有定位最好写上top和left，不然易出bug。 
     * left和transform搭配，可以用来元素居中
     */
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    /* 八卦图还有2个小圆，但伪元素不能套伪元素，所以仍然可以用渐变来解决 */
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 100%);
    border-radius: 50%;
}
#div1::after {
    width: 100px;
    height: 100px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%);
    border-radius: 50%;
}
`;

let n = 0;
let string2 = '';   // string是保存要显示的全部文字，而string2是对每次要显示的字进行缓存

// 注意setTimeout和setInterval的区别。这里使用setInterval，因为可以每隔3秒都执行一次，而setTimeout只执行一次就不执行了。
// 3秒钟后，n变为n+1。 parcel在3秒后会自动把文本变为n+1，而不需要重新刷新网页，这是parcel的优点
// 新手写法
// setInterval(() => {
//     n = n + 1;
//     html.innerHTML = n;
// }, 1000)

// 拓展：老手不用setInterval，而是用递归的setTimeout
let step = () => {
    setTimeout(() => {
        // 如果字符是换行，JS里会自动将换行变为空格---如果对这个有疑问可以console.log一下string的每个字符，会发现有换行在，此时要把JS里的换行改为html的<br>换行标签
        // 如果不是换行，就直接从string那里抄过来，加到string2中
        // 完整写法：
        if (string[n] === "\n") {
            string2 += "<br>";
        } else if (string[n] === " ") {
            string2 += "&nbsp;"    // &nbsp是html中的空格
        } else {
            string2 += string[n]
        }

        // 下面这个是简便写法：(没有判断缩进)
        // string2 += (string[n] === "\n" ? "<br>" : string[n])

        html.innerHTML = string2;
        style.innerHTML = string.substring(0, n);
        // 页面代码太长，设置页面自动往下滚动——上下方向
        window.scrollTo(0, 99999)    // 这是设置的PC端口自动滚动
        html.scrollTo(0, 99999)      // 这是设置的手机端口自动滚动

        if(n < string.length - 1 ) {
            n += 1;
            // step()这个目的是为了让每次执行的结果保留下来，索引值0变1,1变2,2变3,3变4...
            step();
        }
    }, 0);
};
step();


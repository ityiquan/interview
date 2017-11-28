# 前端面试常见算法题

### 数组去重

```javascript
let unique = function(arr) {  
  let hashTable = {};
  let data = [];
  for(let i=0,l=arr.length;i<l;i++) {
    if(!hashTable[arr[i]]) {
      hashTable[arr[i]] = true;
      data.push(arr[i]);
    }
  }
  return data
}

```

### 统计一个字符串出现最多的字母

```javascript
function findMaxDuplicateChar(str) {  
  if(str.length == 1) {
    return str;
  }
  let charObj = {};
  for(let i=0;i<str.length;i++) {
    if(!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1;
    }else{
      charObj[str.charAt(i)] += 1;
    }
  }
  let maxChar = '',
      maxValue = 1;
  for(var k in charObj) {
    if(charObj[k] >= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  return maxChar;
}

```

### 冒泡排序

```javascript
function bubbleSort(arr) {  
    for(let i = 0,l=arr.length;i<l-1;i++) {
        for(let j = i+1;j<l;j++) { 
          if(arr[i]>arr[j]) {
                let tem = arr[i];
                arr[i] = arr[j];
                arr[j] = tem;
            }
        }
    }
    return arr;
}
```

### 快排

```javascript
function quickSort(arr) {
    if(arr.length<=1) {
        return arr;
    }
    let leftArr = [];
    let rightArr = [];
    let q = arr[0];
    for(let i = 1,l=arr.length; i<l; i++) {
        if(arr[i]>q) {
            rightArr.push(arr[i]);
        }else{
            leftArr.push(arr[i]);
        }
    }
    return [].concat(quickSort(leftArr),[q],quickSort(rightArr));
} 
```

### 二叉树

```javascript
// 节点对象的构造函数
function Node(data, left, right) {
   this.data = data;
   this.left = left;
   this.right = right;
   this.show = show;
}

function show() {
   return this.data;
}
//二叉树的构造函数
function BST() {
   this.root = null;
   this.insert = insert;
   this.inOrder = inOrder;
   
}
//插入方法
function insert(data) {
   var n = new Node(data, null, null);
   if (this.root == null) {
      this.root = n;
   }
   else {
      var current = this.root;
      var parent;
      while (true) {
         parent = current;
         if (data < current.data) {
            current = current.left;
            if (current == null) {
               parent.left = n;
               break;
            }
         }
         else {
            current = current.right;
            if (current == null) {
               parent.right = n;
               break;
            }
         }
      }
   }
}
//调用两次递归遍历二叉树
function inOrder(node) {
   if (!(node == null)) {
      inOrder(node.left);
      console.log(node.show() )
      inOrder(node.right);
   }
}

//将以下数据导入二叉树
nums.insert(23)
nums.insert(45)
nums.insert(16)
nums.insert(37)
nums.insert(3)
nums.insert(99)
nums.insert(22)

  
//中序遍历二叉树
inOrder(nums.root)  
 /*
输出结果为：
 3
 16
 22
 23
 37
 45
 99
*/

```

### 判断字符串字节的长度,在utf-8模式下字母字节是1，汉字字节是3,在gb-2312模式下，字母是1，汉字是2；
```javascript
判断字符串字节的长度
<script>
'use strict';
var str = 'afdscshdo按a';
var n=0;
for(var i=0;i<str.length;i++){
	if(str.charCodeAt(i)>=0x4e00&&str.charCodeAt(i)<=0x9fa5){
		n+=3;//在utf-8中数字的字节长度是3；
	}else{
		n++;}}
alert(n);//13个

```
### 找字符串中最多的数
```javascript
window.onload = function(){
	var str = 'asaddschgcndeewaaaaaaa';
	var arr = str.split('');
	var json = {};
	for(var i=0;i<arr.length;i++){	
		if(json[arr[i]]==undefined){
			json[arr[i]] = 1;
		}else{
			json[arr[i]]++;}}
	var n=0;
	var t=0;
	for(var name in json){
		if(n<json[name]){
			n=json[name];
			t=name;}}
	alert('最多的是'+t+',次数是'+n);
};
```

### splice去重

```javascript
window.onload = function(){
	var arr = [1,2,3,4,1,3,1,4,1,1,1,2,1,2];
	arr.sort(function(n1,n2){
			return n1-n2;});
	for(var i=0;i<arr.length;i++){
		if(arr[i]==arr[i+1]){
			arr.splice(i--,1);}}
	document.write(arr);
};
```
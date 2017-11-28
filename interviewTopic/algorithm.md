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

### 编写一个方法 求一个字符串的字节长度;(假设一个中文占两个字节)

```javascript
var str = '22两是';
alert(getStrlen(str))
function getStrlen(str){
    var json = {len:0};
    var re = /[\u4e00-\u9fa5]/;
    for (var i = 0; i < str.length; i++) {
            if(re.test(str.charAt(i))){
                    json['len']+=2;
         }else{
            json['len']++;
         }
    };
    return json['len'];
}

```

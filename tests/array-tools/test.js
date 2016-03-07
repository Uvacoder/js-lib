QUnit.module(".arrayAny");
QUnit.test("gets true if any item matches", function(assert){
  var result = ArrayTools.arrayAny([1,2,3], function(item){ return item == 3; });
	assert.ok(result, "found item");
});
QUnit.test("gets false if no item matches", function(assert){
  var result = ArrayTools.arrayAny([1,2,3], function(item){ return item == 4; });
	assert.notOk(result, "did not find item");
});
QUnit.module(".arrayFirstIndex");
QUnit.test("gets first index", function(assert){
  var index = ArrayTools.arrayFirstIndex([1,2,3], function(item){ return item == 3; });
	assert.equal(index, 2, "got first index");
	
  var index2 = ArrayTools.arrayFirstIndex([{ a : 1, b : 2},{ a : 3, b : 4},{a :5, b:6}], function(item){ return item.a==3; });
	assert.equal(index2, 1, "got first index");
});
QUnit.module(".arrayIndexes");
QUnit.test("gets indexes", function(assert){
  var index = ArrayTools.arrayIndexes([1,2,3,4,3], function(item){ return item == 3; });
	assert.deepEqual(index, [2,4], "got indexes");
});
QUnit.module(".arrayClone");
QUnit.test("clones array", function(assert){
  var arr = [1,2,3];
  var clone = ArrayTools.arrayClone(arr);
	assert.deepEqual(clone, arr, "arrays match");
	clone[1] = 0;
	assert.deepEqual(arr[0], 1, "did not modify first (new reference)");
});
QUnit.module(".arrayToObject");
QUnit.test("maps array to object", function(assert){
  var result = ArrayTools.arrayToObject([{ a : 1 }, { a : 2 }, { a : 3}], function(item){
    return item.a;
  });
  assert.deepEqual(result, { 
    1 : { a : 1 },
    2 : { a : 2 },
    3 : { a : 3 }
  }, "created mapped object");
});
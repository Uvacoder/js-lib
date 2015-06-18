QUnit.module(".stringRemove");
QUnit.test("removes a word", function(assert){
  var text = StringTools.stringRemove("lorem ipsum", "ipsum");
	assert.equal(text, "lorem ", "removed first");
});
QUnit.test("does not bork on periods", function(assert){
  var text = StringTools.stringRemove("lorem", ["."]);
	assert.equal(text, "lorem", "removed none");
});
QUnit.test("removes a word (multi)", function(assert){
  var text = StringTools.stringRemove("lorem ipsum, lorem ipsum", "ipsum");
	assert.equal(text, "lorem , lorem ", "removed multi");
});
QUnit.test("removes multiple words", function(assert){
  var text = StringTools.stringRemove("hello lorem ipsum world", ["hello", "ipsum"]);
	assert.equal(text, " lorem  world", "removed multiple words");
});

QUnit.module(".capitalizeFirst");
QUnit.test("capitalizes first word", function(assert){
  var capitalText = StringTools.capitalizeFirst("lorem");
	assert.equal(capitalText, "Lorem", "capitalizes first word (one)");
	
	var capitalText2 = StringTools.capitalizeFirst("lorem ipsum");
	assert.equal(capitalText2, "Lorem ipsum", "capitalizes first word (multi)");
});
QUnit.module(".capitalizeAll");
QUnit.test("capitalizes one word", function(assert){
  var capitalText = StringTools.capitalizeAll("lorem");
	assert.equal(capitalText, "Lorem", "capitalizes one word");
});
QUnit.test("capitalizes multiple words", function(assert){
	var capitalText = StringTools.capitalizeAll("lorem ipsum");
	assert.equal(capitalText, "Lorem Ipsum", "capitalizes multiple words");
});
QUnit.test("capitalizes with leading space", function(assert){
	var capitalText = StringTools.capitalizeAll(" lorem ipsum");
	assert.equal(capitalText, " Lorem Ipsum", "capitalizes with leading space");
});
QUnit.module(".lengthChunk");
QUnit.test("chunks string (remainder)", function(assert){
	var chunks = StringTools.lengthChunk("lorem ipsum", 5);
	assert.equal(chunks.length, 3);
	assert.equal(chunks[0], "lorem", "got first chunk");
	assert.equal(chunks[1], " ipsu", "got second chunk");
	assert.equal(chunks[2], "m", "got third chunk");
});
QUnit.test("chunks string (no remainder)", function(assert){
	var chunks = StringTools.lengthChunk("123456123456", 6);
	assert.equal(chunks.length, 2);
	assert.equal(chunks[0], "123456", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.test("chunks string (single chunk)", function(assert){
	var chunks = StringTools.lengthChunk("123456", 10);
	assert.equal(chunks.length, 1);
	assert.equal(chunks[0], "123456", "got first chunk");
});
QUnit.module(".countChunk");
QUnit.test("chunks string (single chunk)", function(assert){
	var chunks = StringTools.countChunk("123456", 1);
	assert.equal(chunks.length, 1);
	assert.equal(chunks[0], "123456", "got first chunk");
});
QUnit.test("chunks string (2 chunks, no remainder)", function(assert){
	var chunks = StringTools.countChunk("123456123456", 2);
	assert.equal(chunks.length, 2);
	assert.equal(chunks[0], "123456", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.test("chunks string (2 chunks, remainder)", function(assert){
	var chunks = StringTools.countChunk("1234561234567", 2);
	assert.equal(chunks.length, 2);
	assert.equal(chunks[0], "1234561", "got first chunk");
	assert.equal(chunks[1], "234567", "got second chunk");
});
QUnit.module(".lengthChunkWords");
QUnit.test("chunks words (partial fit)", function(assert){
	var chunks = StringTools.lengthChunkWords("12345 123456", 6);
	assert.equal(chunks.length, 2, "length correct");
	assert.equal(chunks[0], "12345", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.test("chunks words (complete fit)", function(assert){
	var chunks = StringTools.lengthChunkWords("123456 123456", 6);
	assert.equal(chunks.length, 2, "length correct");
	assert.equal(chunks[0], "123456", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.test("throws error if word too big", function(assert){
  try{
    StringTools.lengthChunkWords("1234567", 6);
  }catch(e){
    assert.ok(true, "threw exception");
    return;
  }
  assert.notOk(false, "did not throw");
});
QUnit.test("chunks words (single)", function(assert){
	var chunks = StringTools.lengthChunkWords("123456", 6);
	assert.equal(chunks.length, 1, "length correct");
	assert.equal(chunks[0], "123456", "got first chunk");
});
QUnit.test("chunks words (multiple)", function(assert){
	var chunks = StringTools.lengthChunkWords("123456 123456 123456", 13);
	assert.equal(chunks.length, 2, "length correct");
	assert.equal(chunks[0], "123456 123456", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.module(".htmlStringToDom");
QUnit.test("changes html string into DOM elements", function(assert){
	var dom = StringTools.htmlStringToDom("<div><span></span></div>");
	var element = dom.querySelector("span");
	assert.ok(!!element, "go element");
});
QUnit.module(".transformToken");
QUnit.test("changes token", function(assert){
	var result = StringTools.transformToken("apple hello orange world", /(apple|orange)/g, function(item){
	  return "big " + item;
	});
	assert.equal(result, "big apple hello big orange world");
});
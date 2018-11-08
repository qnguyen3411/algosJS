
String.prototype.hashCode = function () {
  var hash = 0;
  if (this.length == 0) {
    return hash;
  }
  for (i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;  // bitwise operators are used to manipulate the string in binary
    hash &= hash;
  }
  return hash;                         // by the end of the loop, the hash is unique to this string
}


class HashMap {
  constructor(capacity) {
    this.hashmap = [];
    this.capacity = capacity;
  }

  insert(key, val) {
    let index = this.mod(key.hashCode());
    if(!this.hashmap[index]) {
      this.hashmap[index] = [[key, val]];
    } else {
      this.hashmap[index].push([key, val]);
      if (this.hashmap[index].length > 10) {
        this.grow()
      }
    }
    return this;
  }

  mod(num) {
    return (num % this.capacity + this.capacity) % this.capacity;
  }

  grow() {
    this.capacity = Math.trunc(this.capacity * 1.5);
    this.rehash();
  }

  rehash() {
    for(let i = 0; i < this.hashmap.length; i++) {
      if (this.hashmap[i] != undefined) {
        for(let j = 0; j < this.hashmap[i].length; j++){
          const kvPair = this.hashmap[i].shift();
          this.insert(kvPair[0], kvPair[1]);
        }
      }
    }
  }
}

const hm = new HashMap(10);
for(let i = 0; i < 150; i++) {
  const randKey = Math.random().toString(36).substring(7);
  const randVal = Math.random().toString(36).substring(7);
  hm.insert(randKey, randVal);
}
console.log(hm.hashmap)

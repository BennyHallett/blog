var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    var data = JSON.parse(xhr.responseText);
    var list = document.createElement('ul');

    for (var i = 0; i < data.items.length; i++) {
      var item = document.createElement('li')

      var qxhr = new XMLHttpRequest();
      qxhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var qdata = JSON.parse(xhr.responseText
        }
      }

      item.innerHTML = '<a href="http://stackoverflow.com/a/' + data.items[i].answer_id + '">Answer ' + i + '</a>'
      list.appendChild(item);
    }

    var answers = document.getElementById('answers');
    answers.appendChild(list);
  }
};

xhr.open('GET', 'http://api.stackexchange.com/2.1/users/109246/answers?pagesize=6&order=desc&sort=activity&site=stackoverflow', true);
xhr.send(null);

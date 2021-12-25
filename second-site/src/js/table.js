function generate_table() {
    // get the reference for the body
    var body = document.getElementById("tablearr");
    let day=["Таблица","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
    let coffee = ["Эспрессо","Американо","Каппучино","Латте","Раф"];
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    // creating all cells
      // creates a table row
      var row = document.createElement("tr");
  
      for (var j = 0; j < 7; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(day[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);

    for (var i = 0; i < 5; i++) {
        // creates a table row
        var row = document.createElement("tr");
    
        for (var j = 0; j < 7; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          var cellText = document.createTextNode(coffee[j]);
          cell.appendChild(cellText);
          var cellText = document.createTextNode(contract_allcoffee[i][j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
    
        // add the row to the end of the table body
        tblBody.appendChild(row);
      }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.append(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
  }
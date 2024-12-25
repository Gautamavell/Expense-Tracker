function show() {
        const a = document.getElementById('list');
        if (a.style.display === "none" || a.style.display === "") {
            a.style.display = "block";
            let k = document.getElementById("but");
            k.style.backgroundColor = "white";   
            k.style.color="#522f8a"         
        } else {
            a.style.display = "none";  
            let k = document.getElementById("but");
            k.style.backgroundColor = "#5d6670";
            k.style.color="white"      
        }
    }


    
      let expenses = [];
      
      

      const expenseForm = document.getElementById('expenseForm');
      const expenseInput = document.getElementById('expense');
      const typeSelect = document.getElementById('type');
      const expensePieChartCanvas = document.getElementById('expensePieChart').getContext('2d');
      const expenseBarChartCanvas = document.getElementById('expenseBarChart').getContext('2d');

      
     
      let expensePieChart = new Chart(expensePieChartCanvas, {
        type: 'pie',
        data: {
          labels: ["Pie Chart"],
          datasets: [{
            label: 'Expense by Category',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(15, 139, 25,0.2)',
              'rgba(232, 54, 235,0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgb(15, 139, 25)',
              'rgb(232, 54, 235)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });

     
      let expenseBarChart = new Chart(expenseBarChartCanvas, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Expense by Category (Bar)',
            data: [],
            backgroundColor:[
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(15, 139, 25,0.2)',
              'rgba(232, 54, 235,0.2)'
            ],
            borderColor: [
             'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgb(15, 139, 25)',
              'rgb(232, 54, 235)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

     
      function updateCharts() {
        
        const categoryCounts = {};
        expenses.forEach(expense => {
          categoryCounts[expense.type] = (categoryCounts[expense.type] || 0) + expense.amount;
        });

        
        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

       
        expensePieChart.data.labels = labels;
        expensePieChart.data.datasets[0].data = data;
        expensePieChart.update();

        
        expenseBarChart.data.labels = labels;
        expenseBarChart.data.datasets[0].data = data;
        expenseBarChart.update();
      }

    
      expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        

        const expenseAmount = parseFloat(expenseInput.value);
        const expenseCategory = typeSelect.value;

        if (expenseAmount <= 0) {
          alert('Expense amount must be greater than zero.');
          return; 
        }
        
        if (expenseAmount && expenseCategory) {
          
          expenses.push({ amount: expenseAmount, type: expenseCategory });

        
          expenseInput.value = '';
          typeSelect.value = '';
          document.getElementById('expense-summary').style.display="block";
         
          updateCharts();
        } else {
          alert('Please fill in both the expense amount and category.');
        }
      });

    
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

      // Get the form and chart elements
      const expenseForm = document.getElementById('expenseForm');
      const expenseInput = document.getElementById('expense');
      const typeSelect = document.getElementById('type');
      const expensePieChartCanvas = document.getElementById('expensePieChart').getContext('2d');
      const expenseBarChartCanvas = document.getElementById('expenseBarChart').getContext('2d');

      
      // Initialize the Pie Chart
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

      // Initialize the Bar Chart
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

      // Function to update both Pie and Bar charts
      function updateCharts() {
        // Count the expenses by category
        const categoryCounts = {};
        expenses.forEach(expense => {
          categoryCounts[expense.type] = (categoryCounts[expense.type] || 0) + expense.amount;
        });

        // Prepare data for Pie and Bar charts
        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

        // Update Pie Chart
        expensePieChart.data.labels = labels;
        expensePieChart.data.datasets[0].data = data;
        expensePieChart.update();

        // Update Bar Chart
        expenseBarChart.data.labels = labels;
        expenseBarChart.data.datasets[0].data = data;
        expenseBarChart.update();
      }

      // Handle form submission
      expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const expenseAmount = parseFloat(expenseInput.value);
        const expenseCategory = typeSelect.value;

        if (expenseAmount <= 0) {
          alert('Expense amount must be greater than zero.');
          return; // Exit the function if the amount is invalid
        }
        
        if (expenseAmount && expenseCategory) {
          // Save the expense data
          expenses.push({ amount: expenseAmount, type: expenseCategory });

          // Clear the form inputs
          expenseInput.value = '';
          typeSelect.value = '';

          // Update the charts with the new data
          updateCharts();
        } else {
          alert('Please fill in both the expense amount and category.');
        }
      });

    
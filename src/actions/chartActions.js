export const fetchData = (startDate, endDate, valueMin = 0, valueMax = 100, performanceOptimized = false) => dispatch => {
  fetch(`https://onwarddb.ca/query?startDate=${startDate}&endDate=${endDate}&valueMin=${valueMin}&valueMax=${valueMax}`)
    .then(response => response.json())
    .then(points => {
      let data = {
        labels: [],
        datasets: [{
          label: "CPU Usage",
          data: [],
          pointBackgroundColor: []
        }]
      }

      if (points.length) {
        points.map((point) => {
          data.labels.push(new Date(point.date).toDateString());

          data.datasets[0].data.push({
            x: point.date,
            y: point.value
          });

          let r = 0;
          let g = 0;
          let b = 0;

          if (point.value > 50) {
            r = 255;
          } else if (point.value < 50) {
            b = 255;
          } else {
            g = 255;
          }

          data.datasets[0].pointBackgroundColor.push(`rgba(${r}, ${g}, ${b}, 1)`);

          return true;
        });
      }

      let performanceOptimize = (data.datasets[0].data.length > 200) ? true : false;

      if (!performanceOptimize && performanceOptimized) performanceOptimize = true;

      let options = {
        animation: {
          duration: performanceOptimize ? 0 : 1000
        },
        hover: {
          animationDuration: performanceOptimize ? 0 : 1000
        },
        responsiveAnimationDuration: performanceOptimize ? 0 : 1000,
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20
            }
          }]
        }
      }

      return {
        data: data,
        options: options
      };
    })
    .then(data => dispatch({
      type: 'FETCH_DATA',
      payload: data
    }));
}

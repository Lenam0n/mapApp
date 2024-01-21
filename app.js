var map = L.map('map').setView([0, 0], 2);
L.tileLayer({    
   maxZoom: 3, 
  tileSize: 1, 
  zoomOffset: -1,});
var sidebar = L.control.sidebar({
  options: {
    container: 'sidebar',
    autopan: false,
    closeButton: true,
    position: 'left'
}
});
map.addControl(sidebar);
var imageUrl = './map.svg';
var imageBounds;

var imageSize = [961, 484];
var imageCenter = [imageSize[0]/2, imageSize[1]/2];
imageBounds = [
  [-imageCenter[1], -imageCenter[0]],
  [imageCenter[1], imageCenter[0]]
];

var imageOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

map.fitBounds(imageBounds);
map.setMaxBounds(imageBounds);
map.setZoom(1);

sidebar.addPanel({
  id: 'tab',
  tab: '',
  title: 'uwu',
  pane: 'test',
});
sidebar.disablePanel('tab');

var polygonData = [
  { id: 1, coordinates: [[1,1],[-1,0]], color: getRandomColor(), land: 'Land A' },
  { id: 2, coordinates: [[-10, -10], [0, -10], [0, 0], [-10, 0]], color: getRandomColor(), land: 'Land B' },
];

var polygonCollection = [];
polygonData.forEach(function(data) {
  var polygon = L.polygon(data.coordinates, { color: data.color, interactive: true }).addTo(map);
polygon.on('click', function () {
  // Fetch data from the backend based on the polygon ID
  fetchMockData(data.id)
    .then(result => {
      var articleHeading = "<h1>" + result.heading + "</h1>";
      var articleContent = "<p>" + result.content + "</p>";

      sidebar.enablePanel('tab');
      sidebar.removePanel('tab');
      sidebar.addPanel({
        id: 'tab',
        tab: '',  
        title: articleHeading,
        pane: articleContent,
      });

      sidebar.open("tab");
    })
    .catch(error => {
      var articleHeading = "<h1>Error</h1>";
      var articleContent = "<p>Error fetching data from the backend: " + error.message + "</p>";

      sidebar.enablePanel('tab');
      sidebar.removePanel('tab');
      sidebar.addPanel({
        id: 'tab',
        tab: '',  
        title: articleHeading,
        pane: articleContent,
      });

      sidebar.open("tab");
    });
  });
  polygonCollection.push({ id: data.id, polygon: polygon, land: data.land });
});


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function fetchBackendData(polygonId) {
  return fetch('/api/polygon/' + polygonId)
    .then(response => response.json())
    .then(data => {
      return { heading: data.heading, content: data.content };
    });
}

async function fetchMockData(polygonId) {
  const mockDataMap = {
    1: { heading: 'Land A', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    2: { heading: 'Land B', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  };

  await new Promise(resolve => setTimeout(resolve, 500));

  return mockDataMap[polygonId] || { heading: 'Unknown Land', content: 'No information available for this land.' };
}

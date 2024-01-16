var map = L.map('map').setView([0, 0], 2);
var sidebarContainer = document.getElementById('sidebar');
var imageUrl = './map.svg';
var imageBounds;

var imageSize = [961, 484];
var imageCenter = [imageSize[0] / 2, imageSize[1] / 2];
imageBounds = [
  [-imageCenter[1], -imageCenter[0]],
  [imageCenter[1], imageCenter[0]]
];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

map.fitBounds(imageBounds);

var sidebar = L.control.sidebar({
  autopan: false,
  closeButton: true,
  container: sidebarContainer,
  position: 'left'
}).addTo(map);

//Polygon boundrys müssen noch gemacht werden
var polygonCoordinates = [
  [0, 0],
  [10, 0],
  [10, 10],
  [0, 10]
];



var polygon = L.polygon(polygonCoordinates, { color: 'red' }).addTo(map);

polygon.on('click', function () {
  //einbinden von den backend elementen
  var articleHeading = "<h1>Heading</h1>";

  var articleContent = "<p>some text fetched from backend</p>";

  var fullArticle = articleHeading + articleContent;

  sidebar.setContent(fullArticle);
  sidebar.open();
});

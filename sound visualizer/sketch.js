var SONGNAME = "Illenium & Kerli - Sound of Walking Away.mp3"
var FOLDER_PATH = "Songs/"
const FFT_SMOOTHING = 0.5;
const FFT_BINS = 64;
var w;
var song;
var fft;
var buttonPlay = null;
var buttonStop;
var sliderVol;
var sliderRate;
var directoryPath;
var songFiles;
var songSelector;
var songLoaded = false;

function setup() {
	directoryPath ="."+"/" + FOLDER_PATH;
	createCanvas(512, 256);
	colorMode(HSB);
	//song = loadSound(FOLDER_PATH + SONGNAME,loadedSong);
	fft = new p5.FFT(FFT_SMOOTHING, FFT_BINS);
	w = width/FFT_BINS;
	sliderVol = createSlider(0,1,0.5,0.01);
	sliderRate = createSlider(0,2.0,1,0.01);

	songSelector = createSelect();
	buttonPlay = createButton("Loading");
	buttonPlay.mousePressed(togglePlaying);

	buttonStop = createButton("Stop");
	buttonStop.mousePressed(stopPlaying);
	loadSongOptions();
	songSelector.changed(songSelectionChanged);


}
function loadSongOptions(){
	songSelector.option("Dabin - Alive (feat. RUNN).mp3");
	songSelector.option("Daughter - Medicine (Sound Remedy Remix).mp3");
	songSelector.option("ILLENIUM - Crashing (Lyric Video) ft (Hard). Bahari.mp3");
	songSelector.option("Illenium & Kerli - Sound of Walking Away.mp3");
	songSelector.option("kudasai - you make colors out of grey.mp3");
	/*
	fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: https://www.youtube.com/watch?v=HvqrHaMDjjg' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        songSelector.option(file); 
    });
});*/

}
function songSelectionChanged(){//https://editor.p5js.org/aferriss/sketches/SJtxrLp3M
	songLoaded = false;
	song = loadSound(directoryPath+"/"+ songSelector.value(),loadedSong);
}
function loadedSong(){
	songLoaded = true;
	buttonPlay.html("Play");
	
	
	//togglePlaying(); //autoplay
}
function stopPlaying(){
	if (songLoaded){
		song.stop();
			buttonPlay.html("Play");
	}
	
}
function togglePlaying(){
	if (songLoaded){
		if (song.isPlaying()){
			song.pause();
			buttonPlay.html("Play");
		}
		else {
			song.play();
			buttonPlay.html("Pause");
		}
	}
	
}
function jumpSong(){
	
}
function drawSpectrum(){
	var spectrum = fft.analyze();
	stroke(255);
	for (var i = 0; i < spectrum.length; i++){
		var amp = spectrum[i];
		var y = map(amp, 0, 256, height, 0);
		fill(i,255,255);
		rect(i*w,y, w, height- y);
	}
}
function draw() {


	background(0);
	//var vol = amp.getLevel();
	//var diam = map(vol, 0, 1, 10, 200);
	//ellipse(width/2, height/2, diam, diam);
	drawSpectrum();

	//rect(50,50,20,20);
	if (song != null){
		song.setVolume(sliderVol.value());
			song.rate(sliderRate.value());
	}
	

}
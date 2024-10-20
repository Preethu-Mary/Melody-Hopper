// document.addEventListener("DOMContentLoaded", () => {
//     const mic = document.getElementById("mic");
//     const constraints = {
//         audio: true,
//         video: false 
//     }

//     // const note = document.getElementById("note");
//     // const hz = document.getElementById("hz");
//     // const detune = document.getElementById("detune");
//     // const noteString = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

//     let currentStream = null;
//     // eslint-disable-next-line no-unused-vars
//     let source = null;
//     let audioContext = null; 
//     // let analyser = null;
//     // let buffer = new Float32Array(1024);
//     let rafID = null;

//     // function noteFromPitch( frequency ) {
//     //     var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
//     //     return Math.round( noteNum ) + 69;
//     // }

//     // function frequencyFromNoteNumber( note ) {
//     //     return 440 * Math.pow(2,(note-69)/12);
//     // }
    
//     // function centsOffFromPitch( frequency, note ) {
//     //     return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
//     // }

//     function autoCorrelate( buf, sampleRate ) {
//         // Implements the ACF2+ algorithm
//         var SIZE = buf.length;
//         var rms = 0;
    
//         for (var i=0;i<SIZE;i++) {
//             var val = buf[i];
//             rms += val*val;
//         }
//         rms = Math.sqrt(rms/SIZE);
//         if (rms<0.01) // not enough signal
//             return -1;
    
//         var r1=0, r2=SIZE-1, thres=0.2;
//         for (var i=0; i<SIZE/2; i++)
//             if (Math.abs(buf[i])<thres) { r1=i; break; }
//         for (var i=1; i<SIZE/2; i++)
//             if (Math.abs(buf[SIZE-i])<thres) { r2=SIZE-i; break; }
    
//         buf = buf.slice(r1,r2);
//         SIZE = buf.length;
    
//         var c = new Array(SIZE).fill(0);
//         for (var i=0; i<SIZE; i++)
//             for (var j=0; j<SIZE-i; j++)
//                 c[i] = c[i] + buf[j]*buf[j+i];
    
//         var d=0; while (c[d]>c[d+1]) d++;
//         var maxval=-1, maxpos=-1;
//         for (var i=d; i<SIZE; i++) {
//             if (c[i] > maxval) {
//                 maxval = c[i];
//                 maxpos = i;
//             }
//         }
//         var T0 = maxpos;
    
//         var x1=c[T0-1], x2=c[T0], x3=c[T0+1];
//         a = (x1 + x3 - 2*x2)/2;
//         b = (x3 - x1)/2;
//         if (a) T0 = T0 - b/(2*a);
    
//         return sampleRate/T0;
//     }

//     function startPitchTrack() {
//        analyser = audioContext.createAnalyser();
//        analyser.fftSize = 2048;
//        source.connect(analyser);

//         getPitch();
//     }

//     // function getPitch() {
//     //    analyser.getFloatTimeDomainData(buffer);
//     //    let frequencyInHz = autoCorrelate(buffer, audioContext.sampleRate);
//     //    console.log(frequencyInHz);

//     //    rafID = window.requestAnimationFrame(getPitch);

//     //    let midiNote = noteFromPitch(frequencyInHz)
//     //    note.innerHTML = noteString[midiNote % 12];

//     //    let off = centsOffFromPitch(frequencyInHz, midiNote);

//     //    if (off <30 && off > -30) {
//     //     detune.innerHTML = "In tune";
//     //    }
//     //    else {
//     //     detune.innerHTML = "not In tune";
//     //    }
//     // }

//     function getMicrophoneStream() {
//         navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then((stream) => {
//             currentStream = stream;
//             console.log(stream);

//             audioContext = new AudioContext();
//             source = audioContext.createMediaStreamSource(stream);

//             // startPitchTrack();
// ;        })
//         .catch(() => {
//             alert("Failed to turn the microphone on!");
//             mic.innerHTML = "Enable mic";
//         });
//     }

//     function stopMicrophoneStream() {
//         if (currentStream !== null) {
//             let tracks = currentStream.getTracks();
//             for(let i=0; i<tracks.length; i++) {
//                 tracks[i].stop();
//             }
//         }

//         window.cancelAnimationFrame(rafID);
//     }

//     function main() {
//         let isTracking = mic.getAttribute("data-tracking") === "true";
//         mic.setAttribute("data-tracking", !isTracking);

//         if (!isTracking) {
//             mic.innerHTML = "Enabling...";

//             getMicrophoneStream();
//             mic.innerHTML = "Disable mic";
//         } else {
//             mic.innerHTML = "Enable mic";
//             stopMicrophoneStream();
//         }
//     }

//     mic.onclick = main;
// });

// GOLDELOX serial command reference
// http://www.4dsystems.com.au/appnotes
// http://www.4dsystems.com.au/product/4D_Workshop_4_IDE/downloads
// http://www.4dsystems.com.au/productpages/GOLDELOX/downloads/GOLDELOX_serialcmdmanual_R_1_7.pdf
// https://github.com/4dsystems/Goldelox-Serial-Linux-Library
// driver for programming cable
//  web page http://www.4dsystems.com.au/product/4D_Programming_Cable/
//  linux  http://www.4dsystems.com.au/downloads/micro-USB/Drivers/cp210x-3.1.0.tar.gz
//  osx http://www.4dsystems.com.au/downloads/micro-USB/Drivers/Mac_OSX_VCP_Driver.zip

var os          = require('os');
var serialport  = require('serialport');
var SerialPort  = serialport.SerialPort;

var futures     = require('futures');

var OSXSERIALPORT = '/dev/cu.SLAB_USBtoUART';

var totalMemory   = 0;
var freeMemory    = 0;
var pctMemoryUsed = 0;
var cpuLoadAvg    = 0;
var cpuLoad1m     = 0;
var cpuLoad5m     = 0;
var cpuLoad15m    = 0;

var tickLine  = 7;
var tickCol   = 0;
var tickMax   = 13;

var clearScreen_buffer = new Buffer(2);
clearScreen_buffer[0] = 0xFF;
clearScreen_buffer[1] = 0xD7;

var setXgap_buffer = new Buffer(4);
setXgap_buffer[0] = 0xFF;
setXgap_buffer[1] = 0x7A;
setXgap_buffer[2] = 0x00;
setXgap_buffer[3] = 0x00;

var disableScreenSaver_buffer = new Buffer(4);
disableScreenSaver_buffer[0] = 0x00;
disableScreenSaver_buffer[1] = 0x0C;
disableScreenSaver_buffer[2] = 0x00;
disableScreenSaver_buffer[3] = 0x00;

var BLACK                  = new Buffer([0x00, 0x00]);
var ANTIQUEWHITE           = new Buffer([0xFF, 0x5A]);
var AQUA                   = new Buffer([0x07, 0xFF]);
var AQUAMARINE             = new Buffer([0x7F, 0xFA]);
var AZURE                  = new Buffer([0xF7, 0xFF]);
var BEIGE                  = new Buffer([0xF7, 0xBB]);
var BISQUE                 = new Buffer([0xFF, 0x38]);
var ALICEBLUE              = new Buffer([0xF7, 0xDF]);
var BLANCHEDALMOND         = new Buffer([0xFF, 0x59]);
var BLUE                   = new Buffer([0x00, 0x1F]);
var BLUEVIOLET             = new Buffer([0x89, 0x5C]);
var BROWN                  = new Buffer([0xA1, 0x45]);
var BURLYWOOD              = new Buffer([0xDD, 0xD0]);
var CADETBLUE              = new Buffer([0x5C, 0xF4]);
var CHARTREUSE             = new Buffer([0x7F, 0xE0]);
var CHOCOLATE              = new Buffer([0xD3, 0x43]);
var CORAL                  = new Buffer([0xFB, 0xEA]);
var CORNFLOWERBLUE         = new Buffer([0x64, 0xBD]);
var CORNSILK               = new Buffer([0xFF, 0xDB]);
var CRIMSON                = new Buffer([0xD8, 0xA7]);
var CYAN                   = new Buffer([0x07, 0xFF]);
var DARKBLUE               = new Buffer([0x00, 0x11]);
var DARKCYAN               = new Buffer([0x04, 0x51]);
var DARKGOLDENROD          = new Buffer([0xBC, 0x21]);
var DARKGRAY               = new Buffer([0xAD, 0x55]);
var DARKGREEN              = new Buffer([0x03, 0x20]);
var DARKKHAKI              = new Buffer([0xBD, 0xAD]);
var DARKMAGENTA            = new Buffer([0x88, 0x11]);
var DARKOLIVEGREEN         = new Buffer([0x53, 0x45]);
var DARKORANGE             = new Buffer([0xFC, 0x60]);
var DARKORCHID             = new Buffer([0x99, 0x99]);
var DARKRED                = new Buffer([0x88, 0x00]);
var DARKSALMON             = new Buffer([0xEC, 0xAF]);
var DARKSEAGREEN           = new Buffer([0x8D, 0xF1]);
var DARKSLATEBLUE          = new Buffer([0x49, 0xF1]);
var DARKSLATEGRAY          = new Buffer([0x2A, 0x69]);
var DARKTURQUOISE          = new Buffer([0x06, 0x7A]);
var DARKVIOLET             = new Buffer([0x90, 0x1A]);
var DEEPPINK               = new Buffer([0xF8, 0xB2]);
var DEEPSKYBLUE            = new Buffer([0x05, 0xFF]);
var DIMGRAY                = new Buffer([0x6B, 0x4D]);
var DODGERBLUE             = new Buffer([0x1C, 0x9F]);
var FIREBRICK              = new Buffer([0xB1, 0x04]);
var FLORALWHITE            = new Buffer([0xFF, 0xDE]);
var FORESTGREEN            = new Buffer([0x24, 0x44]);
var FUCHSIA                = new Buffer([0xF8, 0x1F]);
var GAINSBORO              = new Buffer([0xDE, 0xFB]);
var GHOSTWHITE             = new Buffer([0xFF, 0xDF]);
var GOLD                   = new Buffer([0xFE, 0xA0]);
var GOLDENROD              = new Buffer([0xDD, 0x24]);
var GRAY                   = new Buffer([0x84, 0x10]);
var GREEN                  = new Buffer([0x04, 0x00]);
var GREENYELLOW            = new Buffer([0xAF, 0xE5]);
var HONEYDEW               = new Buffer([0xF7, 0xFE]);
var HOTPINK                = new Buffer([0xFB, 0x56]);
var INDIANRED              = new Buffer([0xCA, 0xEB]);
var INDIGO                 = new Buffer([0x48, 0x10]);
var IVORY                  = new Buffer([0xFF, 0xFE]);
var KHAKI                  = new Buffer([0xF7, 0x31]);
var LAVENDER               = new Buffer([0xE7, 0x3F]);
var LAVENDERBLUSH          = new Buffer([0xFF, 0x9E]);
var LAWNGREEN              = new Buffer([0x7F, 0xE0]);
var LEMONCHIFFON           = new Buffer([0xFF, 0xD9]);
var LIGHTBLUE              = new Buffer([0xAE, 0xDC]);
var LIGHTCORAL             = new Buffer([0xF4, 0x10]);
var LIGHTCYAN              = new Buffer([0xE7, 0xFF]);
var LIGHTGOLD              = new Buffer([0xFF, 0xDA]);
var LIGHTGREEN             = new Buffer([0x97, 0x72]);
var LIGHTGREY              = new Buffer([0xD6, 0x9A]);
var LIGHTPINK              = new Buffer([0xFD, 0xB8]);
var LIGHTSALMON            = new Buffer([0xFD, 0x0F]);
var LIGHTSEAGREEN          = new Buffer([0x25, 0x95]);
var LIGHTSKYBLUE           = new Buffer([0x86, 0x7F]);
var LIGHTSLATEGRAY         = new Buffer([0x74, 0x53]);
var LIGHTSTEELBLUE         = new Buffer([0xB6, 0x3B]);
var LIGHTYELLOW            = new Buffer([0xFF, 0xFC]);
var LIME                   = new Buffer([0x07, 0xE0]);
var LIMEGREEN              = new Buffer([0x36, 0x66]);
var LINEN                  = new Buffer([0xFF, 0x9C]);
var MAGENTA                = new Buffer([0xF8, 0x1F]);
var MAROON                 = new Buffer([0x80, 0x00]);
var MEDIUMAQUAMARINE       = new Buffer([0x66, 0x75]);
var MEDIUMBLUE             = new Buffer([0x00, 0x19]);
var MEDIUMORCHID           = new Buffer([0xBA, 0xBA]);
var MEDIUMPURPLE           = new Buffer([0x93, 0x9B]);
var MEDIUMSEAGREEN         = new Buffer([0x3D, 0x8E]);
var MEDIUMSLATEBLUE        = new Buffer([0x7B, 0x5D]);
var MEDIUMSPRINGGREEN      = new Buffer([0x07, 0xD3]);
var MEDIUMTURQUOISE        = new Buffer([0x4E, 0x99]);
var MEDIUMVIOLETRED        = new Buffer([0xC0, 0xB0]);
var MIDNIGHTBLUE           = new Buffer([0x18, 0xCE]);
var MINTCREAM              = new Buffer([0xF7, 0xFF]);
var MISTYROSE              = new Buffer([0xFF, 0x3C]);
var MOCCASIN               = new Buffer([0xFF, 0x36]);
var NAVAJOWHITE            = new Buffer([0xFE, 0xF5]);
var NAVY                   = new Buffer([0x00, 0x10]);
var OLDLACE                = new Buffer([0xFF, 0xBC]);
var OLIVE                  = new Buffer([0x84, 0x00]);
var OLIVEDRAB              = new Buffer([0x6C, 0x64]);
var ORANGE                 = new Buffer([0xFD, 0x20]);
var ORANGERED              = new Buffer([0xFA, 0x20]);
var ORCHID                 = new Buffer([0xDB, 0x9A]);
var PALEGOLDENROD          = new Buffer([0xEF, 0x55]);
var PALEGREEN              = new Buffer([0x9F, 0xD3]);
var PALETURQUOISE          = new Buffer([0xAF, 0x7D]);
var PALEVIOLETRED          = new Buffer([0xDB, 0x92]);
var PAPAYAWHIP             = new Buffer([0xFF, 0x7A]);
var PEACHPUFF              = new Buffer([0xFE, 0xD7]);
var PERU                   = new Buffer([0xCC, 0x27]);
var PINK                   = new Buffer([0xFE, 0x19]);
var PLUM                   = new Buffer([0xDD, 0x1B]);
var POWDERBLUE             = new Buffer([0xB7, 0x1C]);
var PURPLE                 = new Buffer([0x80, 0x10]);
var RED                    = new Buffer([0xF8, 0x00]);
var ROSYBROWN              = new Buffer([0xBC, 0x71]);
var ROYALBLUE              = new Buffer([0x43, 0x5C]);
var SADDLEBROWN            = new Buffer([0x8A, 0x22]);
var SALMON                 = new Buffer([0xFC, 0x0E]);
var SANDYBROWN             = new Buffer([0xF5, 0x2C]);
var SEAGREEN               = new Buffer([0x2C, 0x4A]);
var SEASHELL               = new Buffer([0xFF, 0xBD]);
var SIENNA                 = new Buffer([0xA2, 0x85]);
var SILVER                 = new Buffer([0xC6, 0x18]);
var SKYBLUE                = new Buffer([0x86, 0x7D]);
var SLATEBLUE              = new Buffer([0x6A, 0xD9]);
var SLATEGRAY              = new Buffer([0x74, 0x12]);
var SNOW                   = new Buffer([0xFF, 0xDF]);
var SPRINGGREEN            = new Buffer([0x07, 0xEF]);
var STEELBLUE              = new Buffer([0x44, 0x16]);
var TAN                    = new Buffer([0xD5, 0xB1]);
var TEAL                   = new Buffer([0x04, 0x10]);
var THISTLE                = new Buffer([0xDD, 0xFB]);
var TOMATO                 = new Buffer([0xFB, 0x08]);
var TURQUOISE              = new Buffer([0x47, 0x1A]);
var VIOLET                 = new Buffer([0xEC, 0x1D]);
var WHEAT                  = new Buffer([0xF6, 0xF6]);
var WHITE                  = new Buffer([0xFF, 0xFF]);
var WHITESMOKE             = new Buffer([0xF7, 0xBE]);
var YELLOW                 = new Buffer([0xFF, 0xE0]);
var YELLOWGREEN            = new Buffer([0x9E, 0x66]);

var COLORS = [[0x00, 0x00],  // 2 dimensional array, 0 is black
              [0xFF, 0x5A],
              [0x07, 0xFF],
              [0x7F, 0xFA],
              [0xF7, 0xFF],
              [0xF7, 0xBB],
              [0xFF, 0x38],
              [0xF7, 0xDF],
              [0xFF, 0x59],
              [0x00, 0x1F],
              [0x89, 0x5C],
              [0xA1, 0x45],
              [0xDD, 0xD0],
              [0x5C, 0xF4],
              [0x7F, 0xE0],
              [0xD3, 0x43],
              [0xFB, 0xEA],
              [0x64, 0xBD],
              [0xFF, 0xDB],
              [0xD8, 0xA7],
              [0x07, 0xFF],
              [0x00, 0x11],
              [0x04, 0x51],
              [0xBC, 0x21],
              [0xAD, 0x55],
              [0x03, 0x20],
              [0xBD, 0xAD],
              [0x88, 0x11],
              [0x53, 0x45],
              [0xFC, 0x60],
              [0x99, 0x99],
              [0x88, 0x00],
              [0xEC, 0xAF],
              [0x8D, 0xF1],
              [0x49, 0xF1],
              [0x2A, 0x69],
              [0x06, 0x7A],
              [0x90, 0x1A],
              [0xF8, 0xB2],
              [0x05, 0xFF],
              [0x6B, 0x4D],
              [0x1C, 0x9F],
              [0xB1, 0x04],
              [0xFF, 0xDE],
              [0x24, 0x44],
              [0xF8, 0x1F],
              [0xDE, 0xFB],
              [0xFF, 0xDF],
              [0xFE, 0xA0],
              [0xDD, 0x24],
              [0x84, 0x10],
              [0x04, 0x00],
              [0xAF, 0xE5],
              [0xF7, 0xFE],
              [0xFB, 0x56],
              [0xCA, 0xEB],
              [0x48, 0x10],
              [0xFF, 0xFE],
              [0xF7, 0x31],
              [0xE7, 0x3F],
              [0xFF, 0x9E],
              [0x7F, 0xE0],
              [0xFF, 0xD9],
              [0xAE, 0xDC],
              [0xF4, 0x10],
              [0xE7, 0xFF],
              [0xFF, 0xDA],
              [0x97, 0x72],
              [0xD6, 0x9A],
              [0xFD, 0xB8],
              [0xFD, 0x0F],
              [0x25, 0x95],
              [0x86, 0x7F],
              [0x74, 0x53],
              [0xB6, 0x3B],
              [0xFF, 0xFC],
              [0x07, 0xE0],
              [0x36, 0x66],
              [0xFF, 0x9C],
              [0xF8, 0x1F],
              [0x80, 0x00],
              [0x66, 0x75],
              [0x00, 0x19],
              [0xBA, 0xBA],
              [0x93, 0x9B],
              [0x3D, 0x8E],
              [0x7B, 0x5D],
              [0x07, 0xD3],
              [0x4E, 0x99],
              [0xC0, 0xB0],
              [0x18, 0xCE],
              [0xF7, 0xFF],
              [0xFF, 0x3C],
              [0xFF, 0x36],
              [0xFE, 0xF5],
              [0x00, 0x10],
              [0xFF, 0xBC],
              [0x84, 0x00],
              [0x6C, 0x64],
              [0xFD, 0x20],
              [0xFA, 0x20],
              [0xDB, 0x9A],
              [0xEF, 0x55],
              [0x9F, 0xD3],
              [0xAF, 0x7D],
              [0xDB, 0x92],
              [0xFF, 0x7A],
              [0xFE, 0xD7],
              [0xCC, 0x27],
              [0xFE, 0x19],
              [0xDD, 0x1B],
              [0xB7, 0x1C],
              [0x80, 0x10],
              [0xF8, 0x00],
              [0xBC, 0x71],
              [0x43, 0x5C],
              [0x8A, 0x22],
              [0xFC, 0x0E],
              [0xF5, 0x2C],
              [0x2C, 0x4A],
              [0xFF, 0xBD],
              [0xA2, 0x85],
              [0xC6, 0x18],
              [0x86, 0x7D],
              [0x6A, 0xD9],
              [0x74, 0x12],
              [0xFF, 0xDF],
              [0x07, 0xEF],
              [0x44, 0x16],
              [0xD5, 0xB1],
              [0x04, 0x10],
              [0xDD, 0xFB],
              [0xFB, 0x08],
              [0x47, 0x1A],
              [0xEC, 0x1D],
              [0xF6, 0xF6],
              [0xFF, 0xFF],
              [0xF7, 0xBE],
              [0xFF, 0xE0],
              [0x9E, 0x66]];

// list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});

var com = new SerialPort(OSXSERIALPORT, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
}, false);

com.open(function (error) {
  var sequence1   = futures.sequence();
  if (error) {
      console.log('Error while opening the port ' + error);
  } else {
      sequence1
        .then(function(next) {
          com.write(clearScreen_buffer);
          next(null, 1);
        })
        .then(function(next) {
          com.write(disableScreenSaver_buffer);
          next(null, 2);
        })
        .then(function(next) {
          com.write(setXgap_buffer);
          next(null, 3);
        });
  }
});

function colorAsBuffer (colorIn) {
   var outbuff = new Buffer(4);

   outbuff[0] = 0xFF;
   outbuff[1] = 0x7F;
   outbuff[2] = colorIn[0];
   outbuff[3] = colorIn[1];

   return(outbuff);
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColorAsBuffer () {
   var outbuff = new Buffer(4);
   var c1 = getRandomIntInclusive(1,139);  // eliminate 0 which is black

   outbuff[0] = 0xFF;
   outbuff[1] = 0x7F;
   outbuff[2] = COLORS[c1][0];
   outbuff[3] = COLORS[c1][1];

   return(outbuff);
}

function writeStrAtLine (str, line, color_buffer) {
  var sequence2   = futures.sequence();

  var LineN_buffer = new Buffer(6);
  // 0xFF, 0xE4, 0x00, 0x02, 0x00, 0x00
  LineN_buffer[0] = 0xFF;
  LineN_buffer[1] = 0xE4;
  LineN_buffer[2] = 0x00;
  LineN_buffer[3] = line;  // only 8 lines
  LineN_buffer[4] = 0x00;
  LineN_buffer[5] = 0x00;

  sequence2
    .then(function(next) {
      com.write(LineN_buffer);
      next(null, 1);
    })
    .then(function(next) {
      com.write(color_buffer);
      next(null, 2);
    })
    .then(function(next) {
      com.write(strBuffer(str));
      next(null, 3);
    });

  return;
}

function strBuffer (str) {
  var result = [];
  var code = 0x00;
  result.push(code);

  code = 0x06;
  result.push(code);

  for(var i = 0, length = str.length; i < length; i++) {
      code = str.charCodeAt(i);
      result.push(code);
  }
  code = 0x00;
  result.push(code);  //null termintared
  return (result);
}


function writeCharAtLineCol (charToWrite, line, column, color_buffer) {

  var lineCol_buffer = new Buffer(6);
  var sequence4 = futures.sequence();

  lineCol_buffer[0] = 0xFF;
  lineCol_buffer[1] = 0xE4;
  lineCol_buffer[2] = 0x00;
  lineCol_buffer[3] = line; // only 8 lines
  lineCol_buffer[4] = 0x00;
  lineCol_buffer[5] = column; // only 14 columns

  sequence4
    .then(function(next) {
      com.write(lineCol_buffer);
      next(null, 1);
    })
    .then(function(next) {
      com.write(color_buffer);
      next(null, 2);
    })
    .then(function(next) {
      var char_buff = new Buffer(4);
      char_buff[0] = 0xFF;
      char_buff[1] = 0xFE;
      char_buff[2] = 0x00;
      char_buff[3] = charToWrite.charCodeAt(0);
      com.write(char_buff);
      next(null, 3);
    });

  return;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

setInterval(function(){
  var sequence3   = futures.sequence();

  totalMemory     = os.totalmem();
  freeMemory      = os.freemem();
  pctMemoryUsed   = Math.round(100 - ((freeMemory / totalMemory * 100)));
  cpuLoadAvg      = os.loadavg();
  cpuLoad1m       = roundToTwo(cpuLoadAvg[0]);
  cpuLoad5m       = roundToTwo(cpuLoadAvg[1]);
  cpuLoad15m      = roundToTwo(cpuLoadAvg[2]);

  sequence3
    .then(function(next) {
      writeStrAtLine("           ", 0, colorAsBuffer(WHITE));
      next(null, 1);
    })
    .then(function(next) {
//      console.log("Mem:" + pctMemoryUsed + " ");
//    writeStrAtLine("MEM  :" + pctMemoryUsed + " ", 0, colorAsBuffer(TOMATO));
      writeStrAtLine("MEM  :" + pctMemoryUsed + " ", 0, randomColorAsBuffer());
      next(null, 2);
    })
    .then(function(next) {
//    writeStrAtLine("           ", 2, colorAsBuffer(MEDIUMBLUE));
      writeStrAtLine("           ", 2, colorAsBuffer(WHITE));
      next(null, 3);
    })
    .then(function(next) {
//      console.log("CPU  1m:" + cpuLoad1m);
//    writeStrAtLine("CPU1 :" + cpuLoad1m, 2, colorAsBuffer(MEDIUMBLUE));
      writeStrAtLine("CPU1 :" + cpuLoad1m, 2, randomColorAsBuffer());
      next(null, 4);
    })
    .then(function(next) {
      writeStrAtLine("           ", 3, colorAsBuffer(WHITE));
      next(null, 5);
    })
    .then(function(next) {
//      console.log("CPU  5m:" + cpuLoad5m);
//    writeStrAtLine("CPU5 :" + cpuLoad5m, 3, colorAsBuffer(DARKORANGE));
      writeStrAtLine("CPU5 :" + cpuLoad5m, 3, randomColorAsBuffer());
      next(null, 6);
    })
    .then(function(next) {
      writeStrAtLine("           ", 4, colorAsBuffer(WHITE));
      next(null, 7);
    })
    .then(function(next) {
//      console.log("CPU 15m:" + cpuLoad15m);
//    writeStrAtLine("CPU15:" + cpuLoad15m, 4, colorAsBuffer(WHITE));
      writeStrAtLine("CPU15:" + cpuLoad15m, 4, randomColorAsBuffer());
      next(null, 8);
    })
    .then(function(next) {
      if (tickCol > tickMax ) {
        writeCharAtLineCol(' ', tickLine, tickMax, randomColorAsBuffer());
      } else {
        if (tickCol > 0) {
          writeCharAtLineCol(' ', tickLine, (tickCol - 1), randomColorAsBuffer());
        }
      }
      next(null, 9);
    })
    .then(function(next) {
      if (tickCol > tickMax ) {
        tickCol = 0;
      }
      writeCharAtLineCol('.', tickLine, tickCol, randomColorAsBuffer());
      tickCol += 1;
      next(null, 10);
    });

}, 5000);

# Hacking the 4D Systems uOLED-96G2 display

Nodejs app that displays a few system stats using the serial display interface.

Requirements:

4D Systems uOLED-96G2 display
http://www.4dsystems.com.au/product/uOLED_96_G2/

4D Systems programming cable
http://www.4dsystems.com.au/product/4D_Programming_Cable/
https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx

OSX and Nodejs, or Linux and Nodejs (in my case centos7)

# Install - OSX

- Install the driver for the 4D programming cable using the software listed on 4D programming cable page.
- Clone this repo to your machine
```
git clone https://github.com/watkinspd/4dserialdisplay.git
```

- Install
```
npm install
```

- Run
```
npm start <optionally specify the serial port device>
```

# Install linux - in my case Centos7 on a Minnowboard max turbot

- Check which tty serial devices are on the machine
```
ls /dev
```
- Connect the display via the USB programing cable - there should be no need to build or manually install the device driver
- Check which tty device was added (ex: /dev/ttyUSB0 )
- Check the permissions on the display serial device
```
ls -l /dev/ttyUSB0
```

- If needed add the user you will be running the app under to the group that has permissions on the devices
```
usermod -a -G dialout MY_USER_NAME
```

- Exit the terminal session / logout / login to pickup the usermod changes

- Clone this repo to your machine
```
git clone https://github.com/watkinspd/4dserialdisplay.git
```

- Install
```
npm install
```

- Run
```
npm start <optionally specify the serial port device>
```

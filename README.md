# Hacking the 4D Systems uOLED-96G2 display

Nodejs app that displays a few system stats using the serial display interface.

Requirements:

4D Systems uOLED-96G2 display
http://www.4dsystems.com.au/product/uOLED_96_G2/

4D Systems programming cable
http://www.4dsystems.com.au/product/4D_Programming_Cable/
https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx

OSX and Nodejs

# Install - OSX

1. Install the driver for the 4D programming cable using the software listed on 4D programming cable page.
2. clone this repo to your machine
```
git clone https://github.com/watkinspd/4dserialdisplay.git
```

3. install
```
npm install
```

4. run
```
npm start <optionally specify the serial port device>
```

# Linux - in my case Centos7 on a Minnowboard max turbot

1. Check which tty serial devices are on the machine
```
ls /dev
```
2. Connect the display via the USB programing cable - there should be no need to build or manually install the device driver
3. Check which tty device was added (ex: /dev/ttyUSB0 )
4. Check the permissions on the display serial device
```
ls -l /dev/ttyUSB0
```

5. if needed add the user you will be running the app under to the group that has permissions on the devices
```
usermod -a -G dialout MY_USER_NAME
```

6. exit the terminal session / logout / login to pickup the usermod changes

7. clone this repo to your machine
```
git clone https://github.com/watkinspd/4dserialdisplay.git
```

8. install
```
npm install
```

9. run
```
npm start <optionally specify the serial port device>
```

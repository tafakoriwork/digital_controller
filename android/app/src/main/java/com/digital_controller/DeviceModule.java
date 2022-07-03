package com.digital_controller;

import android.telephony.SmsManager;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceModule extends ReactContextBaseJavaModule {
    //constructor
    public DeviceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "TAFAKORISMS";
    }

    public void sendSMS(String phoneNo, String msg) {
        try {
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(phoneNo, null, msg, null, null);


        } catch (Exception ex) {

            ex.printStackTrace();
        }
    }
    //Custom function that we are going to export to JS
    @ReactMethod
    public void sendMsg(String phonenumber, String msg, Callback cb) {
        try{
sendSMS(phonenumber, msg);
            cb.invoke(null, "====sds===="+phonenumber);
        }catch (Exception e){
            cb.invoke(e.toString(), null);
        }
    }
}
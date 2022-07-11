package com.digital_controller;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.telephony.SmsManager;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.List;

public class DeviceModule extends ReactContextBaseJavaModule {
    //constructor
    Context ctx = null;
    public DeviceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.ctx = reactContext;
    }

    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "TAFAKORISMS";
    }

    @SuppressLint("MissingPermission")
    public void sendSMS(String phoneNo, String msg, Integer sim) {
        try {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {

                SubscriptionManager localSubscriptionManager = SubscriptionManager.from(this.ctx);

                if (localSubscriptionManager.getActiveSubscriptionInfoCount() > 1) {
                    List localList = localSubscriptionManager.getActiveSubscriptionInfoList();

                    SubscriptionInfo simInfo1 = (SubscriptionInfo) localList.get(0);
                    SubscriptionInfo simInfo2 = (SubscriptionInfo) localList.get(1);
                    if(sim == 1)
                    SmsManager.getSmsManagerForSubscriptionId(simInfo1.getSubscriptionId()).sendTextMessage(phoneNo, null, msg, null, null);
                    else
                    SmsManager.getSmsManagerForSubscriptionId(simInfo2.getSubscriptionId()).sendTextMessage(phoneNo, null, msg, null, null);
                }
                else {
                    SmsManager.getDefault().sendTextMessage(phoneNo, null, msg, null, null);
                }
            }
            else {
                SmsManager.getDefault().sendTextMessage(phoneNo, null, msg, null, null);
            }


        } catch (Exception ex) {

            ex.printStackTrace();
        }
    }
    //Custom function that we are going to export to JS
    @ReactMethod
    public void sendMsg(String phonenumber, String msg, Integer sim, Callback cb) {
        try{
            sendSMS(phonenumber, msg, sim);
            cb.invoke(null, "SENT"+sim);
        }catch (Exception e){
            cb.invoke(e.toString(), null);
        }
    }
}
//
//  RNDeviceInfo.m
//  alamiAssessmentTest
//
//  Created by Ryandhika Rukmana on 02/09/22.
//

#import "RCTDeviceInfoModule.h"
#import <Foundation/Foundation.h>
#import <React/RCTLog.h>
#import <sys/utsname.h>

@implementation RCTDeviceInfoModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getDeviceID: (RCTResponseSenderBlock)callback) {
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];
    #if TARGET_IPHONE_SIMULATOR
        deviceId = [NSString stringWithFormat:@"%s", getenv("SIMULATOR_MODEL_IDENTIFIER")];
    #endif
    callback(@[deviceId]);
}

@end

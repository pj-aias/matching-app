//
//  DistributedBbs.m
//  MatchingApp
//
//  Created by 牧野青希 on 2021/08/31.
//

#import <Foundation/Foundation.h>
#import"React/RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(DistributedBBS, NSObject)
  RCT_EXTERN_METHOD(
                    sign: (String)message
                    credential: (String)credential
                    gpk: (String)gpk
                    seed: (String)seed
                    )
@end

RCT_EXPORT_MODULE(CalendarModuleFoo);

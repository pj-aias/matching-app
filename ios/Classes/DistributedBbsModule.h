#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end// NOTE: Append the lines below to ios/Classes/GreeterPlugin.h

char *mobile_sign(const char *msg, const char *cred, const char *gpk, const char *seed);

bool mobile_verify(const char *msg, const char *signature, const char *gpk);

intptr_t rust_number(void);

void rust_cstr_free(char *s);

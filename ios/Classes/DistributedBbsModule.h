#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end#ifndef CBINDGEN_BINDINGS_H
#define CBINDGEN_BINDINGS_H

int32_t rust_number(void);

jstring Java_com_matchingapp_DistributedBbsModule_sign(JNIEnv env,
                                                       JClass,
                                                       JString msg,
                                                       JString cred,
                                                       JString gpk,
                                                       JString seed);

bool Java_com_matchingapp_DistributedBbsModule_verify(JNIEnv env,
                                                      JClass,
                                                      JString msg,
                                                      JString signature,
                                                      JString gpk);

int32_t Java_com_matchingapp_DistributedBbsModule_rust_number(JNIEnv, JClass);

char *sign(const char *msg, const char *cred, const char *gpk, const char *seed);

bool verify(const char *msg, const char *signature, const char *gpk);

void rust_cstr_free(char *s);

#endif /* CBINDGEN_BINDINGS_H */

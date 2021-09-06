#include <stdint.h>
#include <stddef.h>

struct rust_string;

struct rust_string_ptr
{
    const uint8_t *ptr;
    size_t len;
};

struct rust_string_ptr *rust_string_ptr(const struct rust_string *s);

void rust_string_destroy(struct rust_string *s);

void rust_string_ptr_destroy(struct rust_string_ptr *s);

struct rust_string_ptr *rust_bbs_sign(struct rust_string_ptr msg, struct rust_string_ptr cred, struct rust_string_ptr gpk, struct rust_string_ptr seed);
int rust_bbs_verify(struct rust_string_ptr msg, struct rust_string_ptr signature, struct rust_string_ptr gpk);
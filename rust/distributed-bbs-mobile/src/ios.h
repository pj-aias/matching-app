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
#include <stdint.h>

struct rust_string;

struct rust_string_ptr {
    const uint8_t* ptr;
    size_t len;
};
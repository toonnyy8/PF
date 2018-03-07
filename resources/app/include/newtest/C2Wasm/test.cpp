#include <fstream>
#include <iostream>
#include <math.h>
#include <sstream>
#include <string>

using namespace std;

//emcc test.cpp -std=gnu++1z -O3 -s WASM=1 -s SIDE_MODULE=1 -o test.wasm

extern "C" {
int test();
};

int test()
{
    return [=]() { return 12312323; }();
}

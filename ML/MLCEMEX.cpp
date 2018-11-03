#include <algorithm>
#include <math.h>
#include <cstdio>
#include <deque>
#include <iomanip>
#include <iostream>
#include <queue>
#include <map>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <vector>
#include <cstring>
#include <climits>
#define ll long long
#define ull unsigned long long
#define FOR(m,s,n,u) for(int m=s; m<n; m+=u)
#define ROF(m,s,n,u) for(int m=n; m>=s; m-=u)
#define FORb(m,s,n,u,k) for(int m=s; m<n&&k; m+=u)
#define pb push_back
#define mod 1000000007
#define MOD(x) ((x%mod)+mod)%mod
#define sync ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL)
#define vi vector<int>
using namespace std;

struct empresa{
    int facturasGeneradasPorDia; 
    int cadaCuantosDiasBajaFacturas;
};

int recomendacion(empresa empresas[], int n, int query){
    int rec;
    if(query ==0) return 0;
    double m = 1; 
    int penSum = 0; 
    for(int i=0; i<n; i++){
        penSum+=empresas[i].facturasGeneradasPorDia/empresas[i].cadaCuantosDiasBajaFacturas;
    }
    m = penSum/n; 
    rec = ceil(m / query);
    return rec; 
}


int main(){
sync;

empresa uno;
uno.facturasGeneradasPorDia = 12; 
uno.cadaCuantosDiasBajaFacturas = 4;
//(12,4)
empresa dos; 
dos.facturasGeneradasPorDia = 290; 
dos.cadaCuantosDiasBajaFacturas = 1; 
//(290/1)
empresa tres; 
tres.facturasGeneradasPorDia = 2; 
tres.cadaCuantosDiasBajaFacturas = 10; 
//(2,10)
empresa cuatro; 
cuatro.facturasGeneradasPorDia = 9; 
cuatro.cadaCuantosDiasBajaFacturas = 7; 
//(9,7)
empresa empresas[4] = {uno, dos, tres, cuatro};

int n = 4;

int query; 
cout<<"dame tu query"<<endl;
cin>>query; 

cout<<recomendacion(empresas, n, query)<<endl;

return 0;
}
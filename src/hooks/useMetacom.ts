import { useEffect } from 'react';
import { Metacom } from 'metacom';

const metacom = Metacom.create('http://localhost:8001') as any;
const w = window as any;
w.metaapi = metacom.api;
console.log('API', w.metaapi);

metacom.api.example = {};
metacom.api.example.get = metacom.scaffold('example')('get');

const tryMetacom = async () => {
  try {
    // await metacom.load('auth'); // Load `auth` interface
    // await api.auth.status(); // Check session status
  } catch (err) {
    console.log(err);
    // await api.auth.signIn({ login: 'marcus', password: 'marcus' });
  }
  // await metacom.load('example'); // Load `example` interface
  // const result = api.example.methodName({ arg1, arg2 });
};

export const useMetacom = () => {
  useEffect(() => {
    tryMetacom();
  }, []);
};

import https from 'https';

const Request = (url: string, callback : (body:any)=> void) => {
    const request = https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            return callback(data);
        });
    });
    request.on('error', (error) => {
        console.log('An error', error);
    });
    request.end();
}


export default Request;
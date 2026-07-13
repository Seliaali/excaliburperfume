# Excalibur Perfume - Static Site

Pure HTML / CSS / Vanilla JS. No build step. Drop these files into an Amazon S3 bucket configured for static website hosting.

## Files
- `index.html` - the page
- `styles.css` - all styling, including the added mist, sheen, and reveal animations
- `script.js` - renders testimonials + current year
- `assets/excalibur-logo.svg` - logo

## Deploy to S3 (quick steps)
1. Create an S3 bucket (e.g. `excaliburperfume.com`).
2. **Properties -> Static website hosting -> Enable**. Index document: `index.html`.
3. **Permissions -> Block public access -> Off** (uncheck all) and confirm.
4. Add this bucket policy (replace BUCKET_NAME):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::BUCKET_NAME/*"
     }]
   }
   ```
5. Upload all files (preserve the `assets/` folder).
6. Open the **Bucket website endpoint** URL shown in Static website hosting.

## Local preview
Just open `index.html` in a browser, or run:
```
python3 -m http.server 8080
```


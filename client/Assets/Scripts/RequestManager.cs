using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.IO;

namespace Jesusnoseq.Util
{
    public delegate void OnRequestCompleteCallBack(string result);

    public class RequestManager : MonoBehaviour { 

        public void Get(String url, OnRequestCompleteCallBack callback)
        {
            StartCoroutine(GetCor(url, callback));
        }

        public void Post(String url, string form, OnRequestCompleteCallBack callback)
        {
            StartCoroutine(PostCor(url, form, callback));
        }

        private IEnumerator GetCor(string url, OnRequestCompleteCallBack callback)
        {
            WWW www = new WWW(url);
            yield return www;
            if (www.error == null)
            {
                callback(www.text);
            }
            else
            {
                Debug.Log("ERROR: " + www.error);
            }
        }

        private IEnumerator PostCor(string url, string postData, OnRequestCompleteCallBack callback)
        {
            WWW www;
            Dictionary<string, string> postHeader = new Dictionary<string, string>();
            postHeader.Add("Content-Type", "application/json");

            // convert json string to byte
            var formData = System.Text.Encoding.UTF8.GetBytes(postData);

            www = new WWW(url, formData, postHeader);

            yield return new WaitUntil(()=> { return www.isDone;  });

            callback(www.text);
        }


    }
}
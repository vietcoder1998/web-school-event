(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{115:function(e,t,l){"use strict";l.r(t);var n=l(4),o=l.n(n),a=l(61),i=l(60),r=l(19),s=l(0),c=l(39),u=l(8);t.default=Object(r.connect)((e,t)=>({regions:e.Regions.items}),e=>({getRegions:(t,l)=>e({type:s.b.REGIONS.GET_REGIONS,pageIndex:t,pageSize:l}),getJobResult:t=>e({type:s.b.JOB_RESULT.GET_JOB_RESULT,body:t})}))((function(e){let{regions:t}=e;o.a.useEffect(()=>{e.getRegions()});let[l,n]=o.a.useState({employerID:null,excludedJobIDs:null,excludePriority:null,shuffle:!1,jobNameIDs:null,jobGroupID:null,jobType:null,jobShiftFilter:null,jobLocationFilter:{regionID:null}});return o.a.createElement(a.a,null,o.a.createElement("div",{className:"content"},o.a.createElement("div",{style:{padding:"10px 20px",backgroundColor:"white",boxShadow:"0 0.5px 0 rgba(0, 0, 0, 0.1)"},className:"data"},o.a.createElement(c.Row,{style:{padding:10}},o.a.createElement("h5",null,"Công Việc Theo Tỉnh Thành"),t&&t.map((t,a)=>o.a.createElement(c.Col,{sm:24,md:12,lg:8,xl:8,xxl:4,key:a},o.a.createElement("div",{onClick:()=>{let o=l;o.jobLocationFilter.regionID=t.id,localStorage.setItem("region",JSON.stringify(t)),n(o),e.getJobResult(l),window.scrollTo({top:0})}},o.a.createElement(u.Link,{to:`/result?rid=${t.id}`},t.name,o.a.createElement(i.a,{size:t.totalJobs})))))))))}))}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9kYXRhLXJlZ2lvbnMvRGF0YVJlZ2lvbnMudHN4Il0sIm5hbWVzIjpbImNvbm5lY3QiLCJzdGF0ZSIsIm93blByb3BzIiwicmVnaW9ucyIsIlJlZ2lvbnMiLCJpdGVtcyIsImRpc3BhdGNoIiwiZ2V0UmVnaW9ucyIsInBhZ2VJbmRleCIsInBhZ2VTaXplIiwidHlwZSIsIlJFRFVYX1NBR0EiLCJSRUdJT05TIiwiR0VUX1JFR0lPTlMiLCJnZXRKb2JSZXN1bHQiLCJib2R5IiwiSk9CX1JFU1VMVCIsIkdFVF9KT0JfUkVTVUxUIiwicHJvcHMiLCJSZWFjdCIsInVzZUVmZmVjdCIsInNldEJvZHkiLCJ1c2VTdGF0ZSIsImVtcGxveWVySUQiLCJleGNsdWRlZEpvYklEcyIsImV4Y2x1ZGVQcmlvcml0eSIsInNodWZmbGUiLCJqb2JOYW1lSURzIiwiam9iR3JvdXBJRCIsImpvYlR5cGUiLCJqb2JTaGlmdEZpbHRlciIsImpvYkxvY2F0aW9uRmlsdGVyIiwicmVnaW9uSUQiLCJjbGFzc05hbWUiLCJzdHlsZSIsInBhZGRpbmciLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3hTaGFkb3ciLCJtYXAiLCJpdGVtIiwiaSIsInNtIiwibWQiLCJsZyIsInhsIiwieHhsIiwia2V5Iiwib25DbGljayIsIm5ld0JvZHkiLCJpZCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwid2luZG93Iiwic2Nyb2xsVG8iLCJ0b3AiLCJ0byIsIm5hbWUiLCJzaXplIiwidG90YWxKb2JzIl0sIm1hcHBpbmdzIjoiMkZBQUEseUVBc0ZlQSw0QkFYUyxDQUFDQyxFQUFrQkMsS0FBbkIsQ0FDcEJDLFFBQVNGLEVBQU1HLFFBQVFDLFFBSUNDLElBQUQsQ0FDdkJDLFdBQVksQ0FBQ0MsRUFBb0JDLElBQXNCSCxFQUFTLENBQUVJLEtBQU1DLElBQVdDLFFBQVFDLFlBQWFMLFlBQVdDLGFBQ25ISyxhQUFlQyxHQUE0QlQsRUFBUyxDQUFFSSxLQUFNQyxJQUFXSyxXQUFXQyxlQUFnQkYsV0FJdkZmLEVBdkVmLFNBQXFCa0IsR0FDakIsSUFBSSxRQUFFZixHQUFZZSxFQUNsQkMsSUFBTUMsVUFBVSxLQUFRRixFQUFNWCxlQUU5QixJQUFLUSxFQUFNTSxHQUNQRixJQUFNRyxTQUFTLENBQ1hDLFdBQVksS0FDWkMsZUFBZ0IsS0FDaEJDLGdCQUFpQixLQUNqQkMsU0FBUyxFQUNUQyxXQUFZLEtBQ1pDLFdBQVksS0FDWkMsUUFBUyxLQUNUQyxlQUFnQixLQUNoQkMsa0JBQW1CLENBQ2ZDLFNBQVUsUUFVdEIsT0FDSSxrQkFBQyxJQUFELEtBQ0kseUJBQUtDLFVBQVUsV0FDWCx5QkFBS0MsTUFBTyxDQUFFQyxRQUFTLFlBQWFDLGdCQUFpQixRQUFTQyxVQUFXLGdDQUFrQ0osVUFBVSxRQUNqSCxrQkFBQyxNQUFELENBQUtDLE1BQU8sQ0FBRUMsUUFBUyxLQUNuQix5REFFSWhDLEdBQ0FBLEVBQVFtQyxJQUNKLENBQUNDLEVBQVlDLElBQ1Qsa0JBQUMsTUFBRCxDQUFLQyxHQUFJLEdBQUlDLEdBQUksR0FBSUMsR0FBSSxFQUFHQyxHQUFJLEVBQUdDLElBQUssRUFBR0MsSUFBS04sR0FDNUMseUJBQ0lPLFFBQ0ksS0FDSSxJQUFJQyxFQUFVakMsRUFDZGlDLEVBQVFqQixrQkFBa0JDLFNBQVdPLEVBQUtVLEdBQzFDQyxhQUFhQyxRQUFRLFNBQVVDLEtBQUtDLFVBQVVkLElBQzlDbEIsRUFBUTJCLEdBckJwRDlCLEVBQU1KLGFBQWFDLEdBQ25CdUMsT0FBT0MsU0FBUyxDQUFFQyxJQUFLLE1BeUJhLGtCQUFDLE9BQUQsQ0FBTUMsR0FBSyxlQUFjbEIsRUFBS1UsTUFDekJWLEVBQUttQixLQUFLLGtCQUFDLElBQUQsQ0FBZUMsS0FBTXBCLEVBQUtxQiIsImZpbGUiOiIxOC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExheW91dCBmcm9tICcuLi9sYXlvdXQvTGF5b3V0JztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3JlZHV4L3N0b3JlL3JlZHVjZXInO1xuaW1wb3J0IHsgRGFuZ2Vyb3VzV29yZCB9IGZyb20gJy4uL2xheW91dC9jb21tb24vQ29tbW9uJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBSRURVWF9TQUdBIH0gZnJvbSAnLi4vLi4vY29uc3QvYWN0aW9ucyc7XG5pbXBvcnQgeyBSb3csIENvbCB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgSUpvYlNlYXJjaEZpbHRlciB9IGZyb20gJy4uLy4uL21vZGVscy9qb2Itc2VhcmNoJztcbmludGVyZmFjZSBJUHJvcHMge1xuICAgIHJlZ2lvbnM/OiBhbnk7XG4gICAgZ2V0UmVnaW9ucz86IEZ1bmN0aW9uO1xuICAgIGdldEpvYlJlc3VsdD86IEZ1bmN0aW9uO1xufVxuXG5mdW5jdGlvbiBEYXRhUmVnaW9ucyhwcm9wczogSVByb3BzKSB7XG4gICAgbGV0IHsgcmVnaW9ucyB9ID0gcHJvcHM7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHsgcHJvcHMuZ2V0UmVnaW9ucygpIH0pO1xuXG4gICAgbGV0IFtib2R5LCBzZXRCb2R5XSA9XG4gICAgICAgIFJlYWN0LnVzZVN0YXRlKHtcbiAgICAgICAgICAgIGVtcGxveWVySUQ6IG51bGwsXG4gICAgICAgICAgICBleGNsdWRlZEpvYklEczogbnVsbCxcbiAgICAgICAgICAgIGV4Y2x1ZGVQcmlvcml0eTogbnVsbCxcbiAgICAgICAgICAgIHNodWZmbGU6IGZhbHNlLFxuICAgICAgICAgICAgam9iTmFtZUlEczogbnVsbCxcbiAgICAgICAgICAgIGpvYkdyb3VwSUQ6IG51bGwsXG4gICAgICAgICAgICBqb2JUeXBlOiBudWxsLFxuICAgICAgICAgICAgam9iU2hpZnRGaWx0ZXI6IG51bGwsXG4gICAgICAgICAgICBqb2JMb2NhdGlvbkZpbHRlcjoge1xuICAgICAgICAgICAgICAgIHJlZ2lvbklEOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIGZ1bmN0aW9uIHNlYXJjaEpvYigpIHtcbiAgICAgICAgcHJvcHMuZ2V0Sm9iUmVzdWx0KGJvZHkpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250ZW50Jz5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDIwcHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsIGJveFNoYWRvdzogJzAgMC41cHggMCByZ2JhKDAsIDAsIDAsIDAuMSknIH19IGNsYXNzTmFtZT0nZGF0YSc+XG4gICAgICAgICAgICAgICAgICAgIDxSb3cgc3R5bGU9e3sgcGFkZGluZzogMTAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDU+Q8O0bmcgVmnhu4djIFRoZW8gVOG7iW5oIFRow6BuaDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9ucyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbnMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaXRlbT86IGFueSwgaT86IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MjR9IG1kPXsxMn0gbGc9ezh9IHhsPXs4fSB4eGw9ezR9IGtleT17aX0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0JvZHkgPSBib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0JvZHkuam9iTG9jYXRpb25GaWx0ZXIucmVnaW9uSUQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWdpb24nLCBKU09OLnN0cmluZ2lmeShpdGVtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCb2R5KG5ld0JvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEpvYigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtgL3Jlc3VsdD9yaWQ9JHtpdGVtLmlkfWB9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLm5hbWV9PERhbmdlcm91c1dvcmQgc2l6ZT17aXRlbS50b3RhbEpvYnN9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db2w+KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9MYXlvdXQgPilcbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBJQXBwU3RhdGUsIG93blByb3BzKSA9PiAoe1xuICAgIHJlZ2lvbnM6IHN0YXRlLlJlZ2lvbnMuaXRlbXNcbn0pXG5cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiAoe1xuICAgIGdldFJlZ2lvbnM6IChwYWdlSW5kZXg/OiBudW1iZXIsIHBhZ2VTaXplPzogbnVtYmVyKSA9PiBkaXNwYXRjaCh7IHR5cGU6IFJFRFVYX1NBR0EuUkVHSU9OUy5HRVRfUkVHSU9OUywgcGFnZUluZGV4LCBwYWdlU2l6ZSB9KSxcbiAgICBnZXRKb2JSZXN1bHQ6IChib2R5PzogSUpvYlNlYXJjaEZpbHRlcikgPT4gZGlzcGF0Y2goeyB0eXBlOiBSRURVWF9TQUdBLkpPQl9SRVNVTFQuR0VUX0pPQl9SRVNVTFQsIGJvZHkgfSlcblxufSlcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoRGF0YVJlZ2lvbnMpIl0sInNvdXJjZVJvb3QiOiIifQ==
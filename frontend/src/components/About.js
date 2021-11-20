import React, { useEffect, useState } from 'react';
import Loader from './Loader';

function About() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);

    return (
        <>
        {loading && <Loader/>}
        {!loading && (  
            <div className='center-text margenContent'>
                <h1>About me</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac ligula sit amet enim eleifend pharetra vitae in lorem. Nunc viverra leo ac justo volutpat luctus. Maecenas quis mi sed massa molestie fermentum. Duis vehicula, magna et feugiat elementum, erat lorem dignissim urna, id elementum augue ipsum quis ligula. Mauris in feugiat orci. Morbi lacinia ut tellus eget consequat. Vestibulum malesuada eros augue.
                </p>
                <p>
                    Proin dictum est quis lorem volutpat, non tristique arcu condimentum. Etiam facilisis vitae ante quis varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum quis placerat risus. Mauris at ex eros. Aliquam erat volutpat. Maecenas eu tincidunt metus, sit amet scelerisque ipsum. Donec sollicitudin felis in suscipit porttitor. Pellentesque non molestie nulla. Suspendisse finibus arcu ac odio ornare ullamcorper. Nam luctus turpis facilisis, convallis risus ac, sagittis libero. Aliquam eget facilisis eros. Donec pretium sem in nisl egestas ultrices. Aliquam erat volutpat. Quisque maximus dolor at dui pharetra, id facilisis nunc lacinia.
                </p>
                <p>
                    Duis sit amet risus turpis. Vivamus elementum bibendum massa. Phasellus eget porttitor felis, eu semper leo. Nullam rutrum lorem id quam dignissim auctor nec quis velit. Donec mattis et massa ac finibus. Quisque est urna, elementum vel arcu eu, dictum vestibulum tellus. Nam eu quam ac quam molestie congue. Quisque viverra erat eu nibh tristique, eu sodales neque venenatis. Sed sed tincidunt velit, nec semper sem. Ut elementum elementum libero sit amet maximus. Ut magna nisi, commodo mollis metus eget, aliquam auctor neque. Curabitur vel consectetur elit.
                </p>
            </div>
        )}
        </>
    )
}

export default About

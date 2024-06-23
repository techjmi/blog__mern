useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('put ur api here');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
